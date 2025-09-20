// 범용 모달 매니저 타입
export interface ModalManagerContextType<T = any> {
  openModal: (options?: ModalOptions<T>) => Promise<T | null>;
  closeModal: (id: string, result?: T | null) => void;
  modals: ModalInstance<T>[];
}

// 범용 모달 인스턴스
export interface ModalInstance<T = any> {
  id: string;
  resolve: (value: T | null) => void;
  reject: (error: Error) => void;
  options: ModalOptions<T>;
  component: React.ComponentType<ModalComponentProps<T>>;
}

// 모달 컴포넌트가 받을 props
export interface ModalComponentProps<T = any> {
  modal: ModalInstance<T>;
  onClose: (id: string, result?: T | null) => void;
}

// 범용 모달 옵션
export interface ModalOptions<T = any> {
  title?: string;
  description?: string;
  initialData?: Partial<T>;
  submitText?: string;
  cancelText?: string;
  submittingText?: string;
  closeButtonLabel?: string;
}