"use client";

import * as React from "react";
import { Menu, Search } from "lucide-react"; // Ícones profissionais
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
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4 md:px-8">
        {/* 1. LOGO */}
        <div className="flex items-center gap-2">
          <span className="text-xl font-bold tracking-tighter text-primary">
            ANIME<span className="text-foreground">FLIX</span>
          </span>
        </div>

        {/* 2. BUSCA (Apenas Desktop) */}
        <div className="hidden md:flex relative w-full max-w-sm items-center">
          <Search className="absolute left-3 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Buscar animes..."
            className="pl-9 rounded-full bg-secondary/50 border-none focus-visible:ring-2 focus-visible:ring-primary"
          />
        </div>

        {/* 3. NAVEGAÇÃO DESKTOP */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          <a href="/" className="hover:text-primary transition-colors">
            Início
          </a>
          <a href="/animes" className="hover:text-primary transition-colors">
            Animes
          </a>
          <a href="/generos" className="hover:text-primary transition-colors">
            Gêneros
          </a>
        </nav>

        {/* 4. MENU MOBILE (O famoso "Hambúrguer") */}
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
                <SheetTitle className="text-left border-b pb-4">
                  Navegação
                </SheetTitle>
              </SheetHeader>
              <div className="flex flex-col gap-4 py-6">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Buscar..." className="pl-9" />
                </div>
                <nav className="flex flex-col gap-2">
                  <a
                    href="/"
                    className="px-2 py-2 text-lg font-semibold hover:bg-secondary rounded-md"
                  >
                    Início
                  </a>
                  <a
                    href="/animes"
                    className="px-2 py-2 text-lg font-semibold hover:bg-secondary rounded-md"
                  >
                    Animes
                  </a>
                  <a
                    href="/generos"
                    className="px-2 py-2 text-lg font-semibold hover:bg-secondary rounded-md"
                  >
                    Gêneros
                  </a>
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}