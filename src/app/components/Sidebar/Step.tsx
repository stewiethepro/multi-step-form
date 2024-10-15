interface StepProps {
  step: {
    number: number;
    title?: string;
  };
  isActive?: boolean;
}

export function Step({ step, isActive = false }: StepProps) {
  return (
    <div className="flex flex-row items-center justify-start gap-6">
      <div
        className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${isActive ? 'border-purple200' : 'border-white'} ${isActive ? 'bg-purple200' : 'bg-none'}`}
      >
        <span className={`text-sm font-bold ${isActive ? 'text-purple700' : 'text-white'}`}>
          {step.number}
        </span>

      </div>
      <div className="hidden sm:flex sm:flex-col sm:gap-2">
        <span className="text-xs text-purple100 font-normal leading-3">
          STEP {step.number}
        </span>
        <strong className="text-sm text-purple100 font-bold leading-3 uppercase tracking-[1px]">
          {step.title}
        </strong>
      </div>
    </div >
  )
} 