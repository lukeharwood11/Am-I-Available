import React, { useState } from 'react';
import { MdSave, MdClose, MdAdd, MdDelete } from 'react-icons/md';
import Modal from '../modal/Modal';
import Input from '../input/Input';
import TextArea from '../textarea/TextArea';
import Button from '../button/Button';
import Select, { SelectOption } from '../select/Select';
import { RecipeCreate, RecipeInstruction, RecipeInstructionType } from '../../types/recipe';
import { useRecipeApi } from '../../hooks/useRecipeApi';
import styles from './CreateRecipeModal.module.css';
import { ErrorMessage } from '../error-message';

interface CreateRecipeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRecipeCreated?: (recipe: any) => void;
}

const CreateRecipeModal: React.FC<CreateRecipeModalProps> = ({
  isOpen,
  onClose,
  onRecipeCreated,
}) => {
  const { createRecipe, loading, error } = useRecipeApi();

  const difficultyOptions: SelectOption[] = [
    { value: 'easy', label: 'Easy' },
    { value: 'medium', label: 'Medium' },
    { value: 'hard', label: 'Hard' },
  ];
  
  const [formData, setFormData] = useState<RecipeCreate>({
    title: '',
    description: '',
    prep_time_minutes: null,
    cook_time_minutes: null,
    servings: null,
    difficulty_level: '',
    instructions: [],
  });

  const [instructions, setInstructions] = useState<RecipeInstruction[]>([
    { step: 1, description: '', type: RecipeInstructionType.INSTRUCTION }
  ]);

  const handleInputChange = (field: keyof RecipeCreate, value: string | number | null) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const recipeData: RecipeCreate = {
      ...formData,
      instructions: instructions.filter(inst => inst.description.trim() !== ''),
    };

    try {
      const createdRecipe = await createRecipe(recipeData);
      if (createdRecipe) {
        onRecipeCreated?.(createdRecipe);
        handleClose();
      }
    } catch (err) {
      console.error('Failed to create recipe:', err);
    }
  };

  const handleClose = () => {
    setFormData({
      title: '',
      description: '',
      prep_time_minutes: null,
      cook_time_minutes: null,
      servings: null,
      difficulty_level: '',
      instructions: [],
    });
    setInstructions([
      { step: 1, description: '', type: RecipeInstructionType.INSTRUCTION }
    ]);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Create New Recipe"
      size="large"
    >
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formSection}>
          <h3 className={styles.sectionTitle}>Basic Information</h3>
          
          <div className={styles.formGroup}>
            <label className={styles.label}>
              Recipe Title <span className={styles.required}>*</span>
            </label>
            <Input
              type="text"
              placeholder="Enter recipe title"
              value={formData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              fullWidth
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Description</label>
            <TextArea
              placeholder="Describe your recipe..."
              value={formData.description || ''}
              onChange={(e) => handleInputChange('description', e.target.value)}
              fullWidth
              rows={3}
            />
          </div>

          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label className={styles.label}>Prep Time (minutes)</label>
              <Input
                type="number"
                placeholder="15"
                value={formData.prep_time_minutes || ''}
                onChange={(e) => handleInputChange('prep_time_minutes', e.target.value ? parseInt(e.target.value) : null)}
                fullWidth
                min="0"
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Cook Time (minutes)</label>
              <Input
                type="number"
                placeholder="30"
                value={formData.cook_time_minutes || ''}
                onChange={(e) => handleInputChange('cook_time_minutes', e.target.value ? parseInt(e.target.value) : null)}
                fullWidth
                min="0"
              />
            </div>
          </div>

          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label className={styles.label}>Servings</label>
              <Input
                type="number"
                placeholder="4"
                value={formData.servings || ''}
                onChange={(e) => handleInputChange('servings', e.target.value ? parseInt(e.target.value) : null)}
                fullWidth
                min="1"
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Difficulty Level</label>
              <Select
                options={difficultyOptions}
                value={formData.difficulty_level || ''}
                placeholder="Select difficulty"
                onChange={(value) => handleInputChange('difficulty_level', value)}
                fullWidth
              />
            </div>
          </div>
        </div>

        {error && (
            <ErrorMessage>{error.message}</ErrorMessage>
        )}

        <div className={styles.formActions}>
          <Button
            type="button"
            variant="secondary"
            leftIcon={<MdClose size={20} />}
            onClick={handleClose}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="primary"
            leftIcon={<MdSave size={20} />}
            isLoading={loading}
            disabled={!formData.title.trim()}
          >
            Create Recipe
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default CreateRecipeModal; 