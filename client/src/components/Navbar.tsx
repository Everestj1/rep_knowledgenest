import { Link, useLocation } from "wouter";
import { BookOpen, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";

export default function Navbar() {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, signOut } = useAuth();

  const handleLogout = async () => {
    await signOut();
  };

  return (
    <nav className="fixed top-0 w-full bg-background border-b border-border z-50">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link href="/" data-testid="link-home">
            <a className="flex items-center gap-2 hover-elevate active-elevate-2 rounded-md px-3 py-2 -ml-3">
              <BookOpen className="h-8 w-8 text-primary" />
              <span className="text-xl md:text-2xl font-bold">LearnHub</span>
            </a>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            <Link href="/" data-testid="link-nav-home">
              <a className={`text-base font-medium hover-elevate active-elevate-2 rounded-md px-3 py-2 ${
                location === "/" ? "text-foreground" : "text-muted-foreground"
              }`}>
                Home
              </a>
            </Link>
            <Link href="/courses" data-testid="link-nav-courses">
              <a className={`text-base font-medium hover-elevate active-elevate-2 rounded-md px-3 py-2 ${
                location === "/courses" ? "text-foreground" : "text-muted-foreground"
              }`}>
                Courses
              </a>
            </Link>
          </div>

          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <Button variant="outline" onClick={handleLogout} data-testid="button-logout">
                Logout
              </Button>
            ) : (
              <>
                <Link href="/login" data-testid="link-login">
                  <Button variant="outline">Login</Button>
                </Link>
                <Link href="/register" data-testid="link-register">
                  <Button>Register</Button>
                </Link>
              </>
            )}
          </div>

          <button
            className="md:hidden p-2 hover-elevate active-elevate-2 rounded-md"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            data-testid="button-mobile-menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col gap-2">
              <Link href="/" data-testid="link-mobile-home">
                <a className="text-base font-medium hover-elevate active-elevate-2 rounded-md px-3 py-2 block">
                  Home
                </a>
              </Link>
              <Link href="/courses" data-testid="link-mobile-courses">
                <a className="text-base font-medium hover-elevate active-elevate-2 rounded-md px-3 py-2 block">
                  Courses
                </a>
              </Link>
              <div className="flex flex-col gap-2 mt-4">
                {user ? (
                  <Button variant="outline" onClick={handleLogout} className="w-full" data-testid="button-mobile-logout">
                    Logout
                  </Button>
                ) : (
                  <>
                    <Link href="/login" data-testid="link-mobile-login">
                      <Button variant="outline" className="w-full">Login</Button>
                    </Link>
                    <Link href="/register" data-testid="link-mobile-register">
                      <Button className="w-full">Register</Button>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
