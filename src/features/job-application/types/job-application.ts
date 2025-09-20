// 채용 지원 폼 특화 타입
export interface JobApplicationFormData {
  name: string;
  email: string;
  experience: 'beginner' | '0-3' | '4-7' | '8+';
  githubUrl?: string;
}

// 채용 지원 폼 유효성 검증 규칙
export interface JobApplicationValidationRule {
  required?: boolean;
  pattern?: RegExp;
  minLength?: number;
  maxLength?: number;
  custom?: (value: string) => string | undefined;
  requiredMessage?: string;
  patternMessage?: string;
  minLengthMessage?: string;
  maxLengthMessage?: string;
}

export interface JobApplicationValidationRules {
  name?: JobApplicationValidationRule;
  email?: JobApplicationValidationRule;
  experience?: JobApplicationValidationRule;
  githubUrl?: JobApplicationValidationRule;
}

// 채용 지원 폼 필드 라벨
export interface JobApplicationFieldLabels {
  name?: string;
  email?: string;
  experience?: string;
  githubUrl?: string;
}

// 채용 지원 모달 옵션
export interface JobApplicationModalOptions {
  title?: string;
  description?: string;
  initialData?: Partial<JobApplicationFormData>;
  validation?: JobApplicationValidationRules;
  submitText?: string;
  cancelText?: string;
  submittingText?: string;
  closeButtonLabel?: string;
  fieldLabels?: JobApplicationFieldLabels;
}

// 경력 옵션
export const EXPERIENCE_OPTIONS = [
  { value: 'beginner', label: '선택해주세요' },
  { value: '0-3', label: '0-3년' },
  { value: '4-7', label: '4-7년' },
  { value: '8+', label: '8년 이상' }
] as const;