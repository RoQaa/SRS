declare module "baguettebox.js" {
  const baguetteBox: {
      run: (selector: string, options?: Record<string, unknown>) => void;
  };
  export default baguetteBox;
}
