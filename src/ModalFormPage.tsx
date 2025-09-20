import {
  GenericModalManagerProvider,
  useGenericModalManager,
} from './hooks/useGenericModalManagerProvider';
import {
  JobApplicationModalForm,
  type JobApplicationFormData,
} from './features/job-application';

const JobApplicationDemo = () => {
  const { openModal } = useGenericModalManager();

  const handleOpenJobApplicationModal = async () => {
    try {
      const result = await openModal<JobApplicationFormData>(
        JobApplicationModalForm,
        {
          title: '신청 폼',
          description: '이메일과 FE 경력 연차 등 간단한 정보를 입력해주세요.',
          submitText: '제출하기',
          cancelText: '취소',
          submittingText: '제출하기...',
          closeButtonLabel: 'Close dialog',
          fieldLabels: {
            name: '이름 / 닉네임',
            email: '이메일',
            experience: 'FE 경력 연차',
            githubUrl: 'GitHub 링크 (선택)',
          },
          validation: {
            name: {
              required: true,
              requiredMessage: '이름은 필수입니다',
              minLength: 2,
              minLengthMessage: '이름은 최소 2자 이상이어야 합니다',
            },
            email: {
              required: true,
              requiredMessage: '이메일은 필수입니다',
              pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              patternMessage: '올바른 이메일 형식을 입력해주세요',
            },
            experience: {
              required: true,
              requiredMessage: '경력 연차를 선택해주세요',
              custom: (value: string) => {
                if (value === 'beginner') return '경력 연차를 선택해주세요';
                return undefined;
              }
            },
            githubUrl: {
              pattern: /^https:\/\/github\.com\/[a-zA-Z0-9_-]+$/,
              patternMessage:
                '올바른 GitHub URL을 입력해주세요 (예: https://github.com/username)',
            },
          },
        }
      );

      if (result) {
        console.log('Job application submitted:', result);
        alert(`${result.name}님의 지원이 완료되었습니다!`);
      } else {
        console.log('Job application cancelled');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="p-8 flex items-center justify-center">
      <button
        onClick={handleOpenJobApplicationModal}
        className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
      >
        신청 폼 열기
      </button>
    </div>
  );
};

const ModalFormPage = () => {
  return (
    <GenericModalManagerProvider>
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <JobApplicationDemo />
      </div>
    </GenericModalManagerProvider>
  );
};

export default ModalFormPage;
