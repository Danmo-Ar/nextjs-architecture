import type { ExternalToast } from 'sonner';
import { toast } from 'sonner';

type TType = 'success' | 'error' | 'info' | 'warning';

export const $toastify = (
    type: TType,
    message?: string[] | string,
    options: ExternalToast = { duration: 3000 }
) => {
    let messages = '';
    if (Array.isArray(message)) {
        const currentMessageArray = message as string[];
        messages = currentMessageArray.join('\n');
    } else {
        const currentMessage = message as string;
        messages = currentMessage;
    }

    toast[type](messages, options);
};
