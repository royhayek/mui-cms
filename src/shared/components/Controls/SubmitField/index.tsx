// Packages
import React from 'react';
import { useForm } from 'uniforms';

// Components
import RegularButton from 'shared/components/Buttons/Primary';

// Component
interface SubmitFieldProps {
  title?: string;
  loading?: boolean;
}

const SubmitField = ({ title, loading }: SubmitFieldProps) => {
  const {
    error,
    state: { disabled },
    submitting,
    validating
  } = useForm();

  return (
    <RegularButton
      text={title}
      type="submit"
      loading={loading}
      disabled={!!error || disabled || submitting || validating}
    />
  );
};

export default SubmitField;
