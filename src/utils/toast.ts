import type {ToastServiceMethods} from "primevue/toastservice";

let toastInstance: ToastServiceMethods | undefined = undefined;

export function registerToast(toast: ToastServiceMethods) {
  toastInstance = toast;
}

export function toastError(message: string) {
  if (!toastInstance) return;
  toastInstance.add({
    severity: "error",
    summary: "Error",
    detail: message,
    life: 4000,
  });
}

export function toastSuccess(message: string) {
  if (!toastInstance) return;
  toastInstance.add({
    severity: "success",
    summary: "Success",
    detail: message,
    life: 3000,
  });
}
