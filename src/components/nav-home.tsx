import Image from 'next/image'
import Link from 'next/link'
import AppButton from './button-app'
import ButtonTheme from './button-theme'
import ButtonIconTwitter from './icon-twitter'

export default function NavHome() {
  return (
    <nav className="fixed left-0 top-0 z-20 mx-auto flex h-[70px] w-full items-center border-b-4 border-border bg-secondary-background px-5">
      <div className="mx-auto flex w-[1300px] text-foreground max-w-full items-center justify-between">
        <div className="flex items-center xl:gap-10 gap-10">
          <Image src="/logo.png" alt="logo" width={100} height={100} className="w-16 h-16" />
          <div className="items-center text-base font-base xl:gap-10 lg:flex gap-10 hidden">
            <Link href="/">Home</Link>
            <Link href="/">About</Link>
            <Link href="/">Contact</Link>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <AppButton />
          <ButtonIconTwitter />
          <ButtonTheme />
        </div>
      </div>
    </nav>
  )
}