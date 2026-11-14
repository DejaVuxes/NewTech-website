import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

/**
 * Button shapes keep the ximitech.vn layout roles; the skin follows the Nexacore reference:
 *  - pill:      56px blue pill with trailing round arrow chip (hero primary)
 *  - accent:    blue button inside a 1px spectrum-gradient ring (the reference's "Contact")
 *  - brand:     solid blue, 8px radius ("Learn more")
 *  - round:     40px circular icon button with hairline border
 *  - underline: bold text link on a 1px rule
 *  - outline / ghost: quiet actions
 *  - onBand:    outline button for dark bands
 */
const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center whitespace-nowrap font-sans font-medium transition-[background-color,color,border-color,transform,filter] duration-200 ease-out outline-none select-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 [&_svg]:stroke-[1.5]",
  {
    variants: {
      variant: {
        pill:
          "h-14 gap-2 rounded-full bg-brand pl-6 pr-2 text-base text-primary-foreground hover:brightness-110",
        accent:
          "ring-grad h-11 gap-2 rounded-[14px] p-0 text-[15px] text-white [&>span.btn-in]:flex [&>span.btn-in]:h-full [&>span.btn-in]:items-center [&>span.btn-in]:gap-2 [&>span.btn-in]:rounded-[13px] [&>span.btn-in]:bg-brand [&>span.btn-in]:px-5 hover:[&>span.btn-in]:bg-transparent",
        brand:
          "h-11 gap-2 rounded-md bg-brand px-6 text-[15px] text-primary-foreground hover:brightness-110",
        round:
          "size-10 rounded-full border border-line bg-surface text-ink hover:bg-chip",
        underline:
          "h-8 gap-2 rounded-none border-b border-ink px-0 pb-2 text-base text-ink hover:border-brand hover:text-brand",
        outline:
          "h-10 gap-2 rounded-md border border-line bg-surface px-4 text-sm text-ink hover:bg-chip",
        ghost:
          "h-8 gap-2 rounded-md px-2 text-sm text-ink hover:bg-chip",
        onBand:
          "h-14 gap-2 rounded-full border border-band-line bg-white/5 px-6 text-base text-band-ink hover:bg-white/10",
      },
      size: {
        default: "",
        sm: "h-9 px-4 text-sm",
      },
    },
    defaultVariants: {
      variant: "brand",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "brand",
  size = "default",
  children,
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    >
      {/* the gradient-ring variant needs an inner surface */}
      {variant === "accent" ? <span className="btn-in">{children as React.ReactNode}</span> : children}
    </ButtonPrimitive>
  )
}

/** Trailing round chip used inside the `pill` variant. */
function PillChip({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      aria-hidden
      className={cn(
        "ml-2 grid size-10 place-items-center rounded-full bg-white/20 transition-transform duration-200 ease-out group-hover/button:translate-x-1",
        className
      )}
    >
      {children}
    </span>
  )
}

/** Small pill label above a heading (the reference's "Control", "Structured Delivery" chips). */
function Eyebrow({
  icon: Icon,
  children,
  onBand,
  className,
}: {
  icon?: React.ComponentType<{ className?: string }>
  children: React.ReactNode
  onBand?: boolean
  className?: string
}) {
  return (
    <p
      className={cn(
        "inline-flex items-center gap-2 rounded-full px-4 py-2 text-[14px] font-medium",
        onBand ? "bg-band-badge text-band-ink" : "border border-line bg-chip text-ink",
        className
      )}
    >
      {Icon && <Icon className={cn("size-4 stroke-[1.5]", onBand ? "text-lavender-2" : "text-brand")} />}
      {children}
    </p>
  )
}

export { Button, PillChip, Eyebrow, buttonVariants }
