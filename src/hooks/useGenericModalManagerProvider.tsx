import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
  type ComponentType,
} from 'react';

// 범용 모달 매니저 타입
interface GenericModalManagerContextType {
  openModal: <T>(
    component: ComponentType<any>,
    options?: any
  ) => Promise<T | null>;
  closeModal: (id: string, result?: any | null) => void;
  modals: GenericModalInstance[];
}

// 범용 모달 인스턴스
interface GenericModalInstance {
  id: string;
  resolve: (value: any | null) => void;
  reject: (error: Error) => void;
  component: ComponentType<any>;
  options: any;
}

const GenericModalManagerContext =
  createContext<GenericModalManagerContextType | null>(null);

// 고유 ID 생성 함수
const generateId = () => Math.random().toString(36).substring(2, 15);

// 범용 모달 매니저 Provider
interface GenericModalManagerProviderProps {
  children: ReactNode;
}

export const GenericModalManagerProvider = ({
  children,
}: GenericModalManagerProviderProps) => {
  const [modals, setModals] = useState<GenericModalInstance[]>([]);

  // 모달 열기 함수
  const openModal = useCallback(
    <T,>(
      component: ComponentType<any>,
      options: any = {}
    ): Promise<T | null> => {
      return new Promise((resolve, reject) => {
        const id = generateId();
        const modalInstance: GenericModalInstance = {
          id,
          resolve,
          reject,
          component,
          options,
        };

        setModals((prev) => [...prev, modalInstance]);
      });
    },
    []
  );

  // 모달 닫기 함수
  const closeModal = useCallback((id: string, result: any = null) => {
    setModals((prev) => {
      let modal: GenericModalInstance | undefined;
      for (let i = 0; i < prev.length; i++) {
        if (prev[i].id === id) {
          modal = prev[i];
          break;
        }
      }
      if (modal) {
        modal.resolve(result);
      }

      const filtered: GenericModalInstance[] = [];
      for (let i = 0; i < prev.length; i++) {
        if (prev[i].id !== id) {
          filtered.push(prev[i]);
        }
      }
      return filtered;
    });
  }, []);

  const contextValue: GenericModalManagerContextType = {
    openModal,
    closeModal,
    modals,
  };

  return (
    <GenericModalManagerContext.Provider value={contextValue}>
      {children}
      {modals.map((modal) => {
        const Component = modal.component;
        return (
          <Component
            key={modal.id}
            modal={{ id: modal.id, options: modal.options }}
            onClose={closeModal}
          />
        );
      })}
    </GenericModalManagerContext.Provider>
  );
};

// 범용 모달 매니저 훅
export const useGenericModalManager = (): GenericModalManagerContextType => {
  const context = useContext(GenericModalManagerContext);
  if (!context) {
    throw new Error(
      'useGenericModalManager must be used within a GenericModalManagerProvider'
    );
  }
  return context;
};
