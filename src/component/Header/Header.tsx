"use client";

import { Menu, Search } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export default function Header() {
  return (
    <header className="bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full backdrop-blur">
      <div className="container flex h-32 items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="font-rubik text-primary text-5xl font-medium text-sky-500">
            Ani.me
          </span>
        </div>

        <nav className="ml-auto hidden items-center gap-12 text-lg font-medium md:flex">
          <Link href="/" className="hover:text-primary transition-colors">
            Inicio
          </Link>
          <Link href="/" className="hover:text-primary transition-colors">
            Lista
          </Link>
          <Link href="/" className="hover:text-primary transition-colors">
            Generos
          </Link>
          <Link href="/" className="hover:text-primary transition-colors">
            Novos episodios
          </Link>
        </nav>

        <div className="ml-20 hidden w-full max-w-80 items-center md:flex">
          <Input
            type="search"
            placeholder="Buscar"
            className="font-inter focus-visible:ring-primary h-12 rounded-full border-none bg-slate-800 pl-6 font-medium placeholder:text-lg placeholder:text-amber-50 focus-visible:ring-2"
          />
        </div>

        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="hover:bg-transparent"
              >
                <Menu className="h-6 w-6" />
                <span className="sr-only">Abrir menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[280px] sm:w-[350px]">
              <SheetHeader>
                <SheetTitle className="border-b pb-4 text-left">
                  Navegacao
                </SheetTitle>
              </SheetHeader>

              <div className="flex flex-col gap-4 py-6">
                <div className="relative">
                  <Search className="text-muted-foreground absolute top-3 left-3 h-4 w-4" />
                  <Input placeholder="Buscar..." className="pl-9" />
                </div>

                <nav className="flex flex-col gap-2">
                  <Link
                    href="/"
                    className="hover:bg-secondary rounded-md px-2 py-2 text-lg font-semibold"
                  >
                    Inicio
                  </Link>
                  <Link
                    href="/"
                    className="hover:bg-secondary rounded-md px-2 py-2 text-lg font-semibold"
                  >
                    Lista
                  </Link>
                  <Link
                    href="/"
                    className="hover:bg-secondary rounded-md px-2 py-2 text-lg font-semibold"
                  >
                    Generos
                  </Link>
                  <Link
                    href="/"
                    className="hover:bg-secondary rounded-md px-2 py-2 text-lg font-semibold"
                  >
                    Novos episodios
                  </Link>
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
