export const addEventListener = <K extends keyof HTMLElementEventMap>(
  el: HTMLElement,
  type: K,
  selector: string | ((this: HTMLElement, ev: HTMLElementEventMap[K]) => any),
  cb?: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any
) => {
  const handler =
    cb != null ? cb : (selector as (ev: HTMLElementEventMap[K]) => any);
  el.addEventListener(type, (ev) => {
    if (ev.target != null && typeof selector === "string") {
      const el = (ev.target as HTMLElement).closest(selector);
      if (el != null) {
        handler.call(el as HTMLElement, ev);
      }
    } else {
      handler.call(ev.target as HTMLElement, ev);
    }
  });
};
