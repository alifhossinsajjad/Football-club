import { Crown, Instagram, Youtube, Facebook } from "lucide-react";
import Image from "next/image";

const Footer = () => {
  return (
    <div>
      {/* Hero Background Image */}
      <div className="relative w-full h-[35vh] sm:h-[45vh] md:h-[55vh] lg:h-[70vh] overflow-hidden">
        <Image
          src="/footer.jpg"
          alt="Stadium Background"
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-dark/80 via-transparent to-transparent" />
      </div>

      <footer className="bg-navy-dark border-t border-cyan/20">
        {/* Main Footer Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12 lg:py-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">

            {/* Brand Section */}
            <div>
              {/* Logo */}
              <div className="flex items-center gap-3 mb-5 sm:mb-6">
                <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-lg border-2 border-cyan flex items-center justify-center flex-shrink-0">
                  <div className="relative">
                    <Crown className="w-4 h-4 sm:w-5 sm:h-5 text-cyan absolute -top-3 left-1/2 -translate-x-1/2" />
                    <span className="font-display font-bold text-foreground text-xs sm:text-sm">
                      NG
                    </span>
                  </div>
                </div>
                <div className="flex flex-col leading-tight">
                  <span className="font-display font-bold text-foreground text-base sm:text-lg">
                    NEXTGEN
                  </span>
                  <span className="font-display font-bold text-cyan text-base sm:text-lg">
                    PROS
                  </span>
                </div>
              </div>

              {/* Tagline */}
              <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed mb-6 sm:mb-8 max-w-xs">
                Connecting the next generation of football talent with opportunities worldwide.
              </p>

              {/* Social Icons */}
              <div className="flex items-center gap-4 sm:gap-5">
                <a href="#" className="text-cyan hover:text-cyan/80 transition-colors">
                  <Instagram className="w-5 h-5 sm:w-6 sm:h-6" />
                </a>
                <a href="#" className="text-cyan hover:text-cyan/80 transition-colors">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
                <a href="#" className="text-cyan hover:text-cyan/80 transition-colors">
                  <Youtube className="w-5 h-5 sm:w-6 sm:h-6" />
                </a>
                <a href="#" className="text-cyan hover:text-cyan/80 transition-colors">
                  <Facebook className="w-5 h-5 sm:w-6 sm:h-6" />
                </a>
              </div>
            </div>

            {/* Platforms */}
            <div>
              <h3 className="font-display font-semibold text-cyan text-base sm:text-lg mb-3 sm:mb-4">
                Platforms
              </h3>
              <ul className="space-y-2 sm:space-y-3">
                {["Home", "Membership"].map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-muted-foreground hover:text-foreground transition-colors text-xs sm:text-sm block"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h3 className="font-display font-semibold text-cyan text-base sm:text-lg mb-3 sm:mb-4">
                Resources Links
              </h3>
              <ul className="space-y-2 sm:space-y-3">
                {["Player Directory", "Agents & Scouts Directory", "Events"].map(
                  (item) => (
                    <li key={item}>
                      <a
                        href="#"
                        className="text-muted-foreground hover:text-foreground transition-colors text-xs sm:text-sm block"
                      >
                        {item}
                      </a>
                    </li>
                  )
                )}
              </ul>
            </div>

            {/* Support */}
            <div>
              <h3 className="font-display font-semibold text-cyan text-base sm:text-lg mb-3 sm:mb-4">
                Support
              </h3>
              <ul className="space-y-2 sm:space-y-3">
                {["Help Center", "Contact Us", "Community"].map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-muted-foreground hover:text-foreground transition-colors text-xs sm:text-sm block"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-cyan/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-3 sm:gap-4 text-center md:text-left">
              <p className="text-muted-foreground text-xs sm:text-sm">
                2025 NextGen Pros. All rights reserved.
              </p>
              <div className="flex flex-wrap justify-center md:justify-end gap-4 md:gap-6">
                {["Privacy policy", "Terms of service", "Cookie Policy"].map(
                  (item) => (
                    <a
                      key={item}
                      href="#"
                      className="text-cyan hover:text-cyan/80 transition-colors text-xs sm:text-sm"
                    >
                      {item}
                    </a>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
