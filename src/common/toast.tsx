import { ToastMessage } from '@/components/ui/toast-message';
import { toast } from 'react-toastify';

export function ToastSucess(content: string) {
  toast(<ToastMessage type='SUCESS' message={content} />);
}

export function ToastError(content: string) {
  toast(<ToastMessage type='ERROR' message={content} />);
}

export function ToastWarning(content: string) {
  toast(<ToastMessage type='WARNING' message={content} />);
}
