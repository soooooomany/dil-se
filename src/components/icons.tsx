import {
  ArrowRight,
  Cake,
  Check,
  ChevronLeft,
  ChevronRight,
  CreditCard,
  Github,
  Heart,
  Home,
  Instagram,
  Loader2,
  LucideProps,
  Mail,
  MapPin,
  Menu,
  Minus,
  Moon,
  MoreVertical,
  Package,
  Phone,
  Plus,
  ShoppingBag,
  ShoppingCart,
  Sun,
  Trash,
  Twitter,
  User,
  X,
  type Icon as LucideIcon,
} from "lucide-react"

export type Icon = LucideIcon

export const Icons = {
  logo: Cake,
  cake: Cake,
  sun: Sun,
  moon: Moon,
  twitter: Twitter,
  instagram: Instagram,
  gitHub: Github,
  arrowRight: ArrowRight,
  chevronLeft: ChevronLeft,
  chevronRight: ChevronRight,
  trash: Trash,
  menu: Menu,
  close: X,
  spinner: Loader2,
  cart: ShoppingCart,
  bag: ShoppingBag,
  plus: Plus,
  minus: Minus,
  check: Check,
  user: User,
  more: MoreVertical,
  heart: Heart,
  package: Package,
  mail: Mail,
  home: Home,
  phone: Phone,
  location: MapPin,
  creditCard: CreditCard,
  google: ({ ...props }: LucideProps) => (
    <svg
      aria-hidden="true"
      focusable="false"
      data-prefix="fab"
      data-icon="google"
      role="img"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 488 512"
      {...props}
    >
      <path
        fill="currentColor"
        d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
      />
    </svg>
  ),
}