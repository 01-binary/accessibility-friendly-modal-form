import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Modal } from '../../../components/ui/modal';
import type {
  JobApplicationFormData,
  JobApplicationModalOptions,
} from '../types/job-application';

interface JobApplicationModalFormProps {
  modal: {
    id: string;
    options: JobApplicationModalOptions;
  };
  onClose: (id: string, result?: JobApplicationFormData | null) => void;
}

export const JobApplicationModalForm = ({
  modal,
  onClose,
}: JobApplicationModalFormProps) => {
  const { options, id } = modal;
  const [errorAnnouncement, setErrorAnnouncement] = useState<string>('');
  const [isOpen, setIsOpen] = useState(true);

  // 취소 핸들러
  const handleCancel = () => {
    setIsOpen(false);
    setTimeout(() => onClose(id, null), 150);
  };

  // react-hook-form 설정
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<JobApplicationFormData>({
    defaultValues: {
      name: options.initialData?.name || '',
      email: options.initialData?.email || '',
      experience: options.initialData?.experience || 'beginner',
      githubUrl: options.initialData?.githubUrl || '',
    },
  });

  // 오류 변경 감지하여 스크린리더에 알림
  useEffect(() => {
    const errorMessages: string[] = [];
    if (errors.name?.message)
      errorMessages.push(`Name: ${errors.name.message}`);
    if (errors.email?.message)
      errorMessages.push(`Email: ${errors.email.message}`);
    if (errors.experience?.message)
      errorMessages.push(`Experience: ${errors.experience.message}`);
    if (errors.githubUrl?.message)
      errorMessages.push(`GitHub URL: ${errors.githubUrl.message}`);

    if (errorMessages.length > 0) {
      const announcement = `Form validation errors: ${errorMessages.join(
        ', '
      )}`;
      setErrorAnnouncement(announcement);

      // 짧은 지연 후 리셋하여 같은 오류가 다시 발생했을 때도 알림되도록 함
      const timer = setTimeout(() => setErrorAnnouncement(''), 1000);
      return () => clearTimeout(timer);
    } else {
      setErrorAnnouncement('');
    }
  }, [errors]);

  // 폼 제출 핸들러
  const onSubmit = async (data: JobApplicationFormData) => {
    try {
      // 커스텀 유효성 검증
      let hasErrors = false;

      if (options.validation?.email?.custom) {
        const emailError = options.validation.email.custom(data.email);
        if (emailError) {
          setError('email', { message: emailError });
          hasErrors = true;
        }
      }

      if (options.validation?.name?.custom) {
        const nameError = options.validation.name.custom(data.name);
        if (nameError) {
          setError('name', { message: nameError });
          hasErrors = true;
        }
      }

      if (options.validation?.experience?.custom) {
        const experienceError = options.validation.experience.custom(
          data.experience
        );
        if (experienceError) {
          setError('experience', { message: experienceError });
          hasErrors = true;
        }
      }

      if (options.validation?.githubUrl?.custom && data.githubUrl) {
        const githubError = options.validation.githubUrl.custom(data.githubUrl);
        if (githubError) {
          setError('githubUrl', { message: githubError });
          hasErrors = true;
        }
      }

      if (hasErrors) return;

      // 성공 시 데이터 반환
      onClose(id, data);
    } catch (error) {
      console.error('Form submission error:', error);
    }
  };

  // 유효성 검증 규칙 생성
  const getValidationRules = (field: keyof JobApplicationFormData) => {
    const rules = options.validation?.[field];
    if (!rules) return {};

    const validation: any = {};

    if (rules.required) {
      validation.required = rules.requiredMessage || `${field} is required`;
    }

    if (rules.pattern) {
      validation.pattern = {
        value: rules.pattern,
        message: rules.patternMessage || `Please enter a valid ${field} format`,
      };
    }

    if (rules.minLength) {
      validation.minLength = {
        value: rules.minLength,
        message:
          rules.minLengthMessage ||
          `Minimum ${rules.minLength} characters required`,
      };
    }

    if (rules.maxLength) {
      validation.maxLength = {
        value: rules.maxLength,
        message:
          rules.maxLengthMessage ||
          `Maximum ${rules.maxLength} characters allowed`,
      };
    }

    return validation;
  };

  const experienceOptions = [
    { value: 'beginner', label: '선택해주세요' },
    { value: '0-3', label: '0-3년' },
    { value: '4-7', label: '4-7년' },
    { value: '8+', label: '8년 이상' },
  ];

  return (
    <>
      {/* 스크린리더를 위한 오류 알림 영역 */}
      <div
        aria-live="assertive"
        aria-atomic="true"
        className="sr-only"
        role="status"
      >
        {errorAnnouncement}
      </div>

      <Modal
        open={isOpen}
        onOpenChange={(open) => !open && handleCancel()}
        onEscapeKeyDown={handleCancel}
      >
        {/* X 버튼 */}
        <Modal.Close asChild>
          <button
            onClick={handleCancel}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-full p-1"
          >
            <span className="sr-only">
              {options.closeButtonLabel || 'Close modal'}
            </span>
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </Modal.Close>

        <Modal.Header className="px-6 py-4 border-b border-gray-200">
          <Modal.Title className="text-lg font-semibold text-gray-900">
            {options.title || '신청 폼'}
          </Modal.Title>
          {options.description && (
            <Modal.Description className="text-gray-600 mt-2">
              {options.description}
            </Modal.Description>
          )}
        </Modal.Header>

        <div className="px-6 py-4">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Name field */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                {options.fieldLabels?.name || '이름 / 닉네임'}
              </label>
              <input
                type="text"
                id="name"
                {...register('name', getValidationRules('name'))}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.name ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.name && (
                <p
                  className="mt-1 text-sm text-red-600"
                  role="alert"
                  aria-live="polite"
                >
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Email field */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                {options.fieldLabels?.email || '이메일'}
              </label>
              <input
                type="email"
                id="email"
                {...register('email', getValidationRules('email'))}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.email ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.email && (
                <p
                  className="mt-1 text-sm text-red-600"
                  role="alert"
                  aria-live="polite"
                >
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Experience field */}
            <div>
              <label
                htmlFor="experience"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                {options.fieldLabels?.experience || 'FE 경력 연차'}
              </label>
              <select
                id="experience"
                {...register('experience', getValidationRules('experience'))}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.experience ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                {experienceOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              {errors.experience && (
                <p
                  className="mt-1 text-sm text-red-600"
                  role="alert"
                  aria-live="polite"
                >
                  {errors.experience.message}
                </p>
              )}
            </div>

            {/* GitHub URL field */}
            <div>
              <label
                htmlFor="githubUrl"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                {options.fieldLabels?.githubUrl || 'GitHub 링크 (선택)'}
              </label>
              <input
                type="url"
                id="githubUrl"
                placeholder="https://github.com/username"
                {...register('githubUrl', getValidationRules('githubUrl'))}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.githubUrl ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.githubUrl && (
                <p
                  className="mt-1 text-sm text-red-600"
                  role="alert"
                  aria-live="polite"
                >
                  {errors.githubUrl.message}
                </p>
              )}
            </div>

            <Modal.Footer className="flex justify-end gap-3 pt-4">
              <button
                type="button"
                onClick={handleCancel}
                className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 transition-colors"
              >
                {options.cancelText || '취소'}
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
              >
                {isSubmitting
                  ? options.submittingText || '제출하기...'
                  : options.submitText || '제출하기'}
              </button>
            </Modal.Footer>
          </form>
        </div>
      </Modal>
    </>
  );
};
