"use client";

import {
  Clock,
  ExternalLink,
  Facebook,
  Instagram,
  MapPin,
  MessageCircle,
  Phone,
  PhoneCall,
  Send,
  ShieldCheck,
  Sparkles,
  Star,
  Twitter,
  Youtube,
} from "lucide-react";
import * as Icons from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export function StoreInformationSections({
  store,
  brand,
  details,
  theme,
  content = {} as any,
  onScroll,
  onMarketplace,
  onSearchAll,
  onNotify,
}) {
  const homepageSections = content.homepageSections || [];
  const featureSection = homepageSections.find(
    (section) => section.sectionType?.toUpperCase() === "FEATURES",
  );
  const configuredFeatures = parseConfiguration(
    featureSection?.configuration,
  ).features;
  const features = Array.isArray(configuredFeatures)
    ? configuredFeatures.map((feature) =>
        typeof feature === "string"
          ? { title: feature, desc: "", icon: "Sparkles" }
          : feature,
      )
    : brand.whyChoose || [];
  const aboutPage = content.pages?.find(
    (page) => page.pageType?.toUpperCase() === "ABOUT",
  );
  const contactPage = content.pages?.find(
    (page) => page.pageType?.toUpperCase() === "CONTACT",
  );
  const privacyPages = (content.pages || []).filter(
    (page) => page.pageType?.toUpperCase() !== "ABOUT" &&
      page.pageType?.toUpperCase() !== "CONTACT",
  );
  const standalonePolicies = (content.policies || []).filter(
    (policy) =>
      !privacyPages.some(
        (page) =>
          page.pageType?.toLowerCase() === policy.policyType?.toLowerCase(),
      ),
  );

  return (
    <>
      {features.length > 0 && (
        <section className="container mt-14">
          <SectionTitle
            title={featureSection?.title || `Why choose ${store.name}?`}
            subtitle={
              featureSection?.subtitle ||
              (brand.yearsInBusiness
                ? `${brand.yearsInBusiness} years of serving your community`
                : undefined)
            }
            theme={theme}
          />
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {features.map((item, index) => {
            const Icon = Icons[item.icon] || Icons.Sparkles;
            return (
              <Card
                key={`${item.title}-${index}`}
                className="p-5 text-center hover:shadow-card transition"
              >
                <div
                  className="w-14 h-14 mx-auto rounded-2xl flex items-center justify-center mb-3"
                  style={{ background: theme.accent, color: theme.primary }}
                >
                  <Icon className="w-6 h-6" />
                </div>
                <div className="font-bold">{item.title}</div>
                <div className="text-xs text-muted-foreground mt-1">
                  {item.desc}
                </div>
              </Card>
            );
          })}
          </div>
        </section>
      )}

      {brand.testimonials?.length > 0 && !details.configuredStore && (
        <section className="container mt-14">
          <SectionTitle
            title="What our customers say"
            subtitle={`${store.reviews.toLocaleString()}+ happy customers`}
            theme={theme}
          />
          <div className="grid md:grid-cols-3 gap-4">
            {brand.testimonials.map((testimonial, index) => (
            <Card key={`${testimonial.n}-${index}`} className="p-5">
              <div className="flex text-amber-500 mb-2">
                {[...Array(testimonial.r)].map((_, starIndex) => (
                  <Star key={starIndex} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <p className="text-sm leading-relaxed">"{testimonial.t}"</p>
              <div className="mt-4 flex items-center gap-3 pt-3 border-t border-border">
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center text-white font-bold"
                  style={{ background: theme.primary }}
                >
                  {testimonial.n.charAt(0)}
                </div>
                <div>
                  <div className="font-semibold text-sm">{testimonial.n}</div>
                  <div className="text-xs text-muted-foreground">
                    {testimonial.role}
                  </div>
                </div>
              </div>
            </Card>
          ))}
          </div>
        </section>
      )}

      <section id="about" className="container mt-14">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <div
              className="text-xs uppercase font-bold tracking-wider"
              style={{ color: theme.primary }}
            >
              About {store.name}
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold mt-2">
              {aboutPage?.title ||
                (brand.established
                  ? `Serving since ${brand.established}`
                  : `Welcome to ${store.name}`)}
            </h2>
            <p className="text-sm md:text-base text-muted-foreground mt-3 leading-relaxed">
              {aboutPage?.description || details.description}
            </p>
            {!details.configuredStore && (
              <>
                <div className="grid grid-cols-3 gap-3 mt-6">
                  <MiniStat
                    n={`${brand.yearsInBusiness}+`}
                    label="Years"
                    color={theme.primary}
                  />
                  <MiniStat
                    n={details.ordersCompleted}
                    label="Orders"
                    color={theme.primary}
                  />
                  <MiniStat
                    n={`${details.products.toLocaleString()}+`}
                    label="Products"
                    color={theme.primary}
                  />
                </div>
                <div
                  className="mt-5 flex items-center gap-3 p-3 rounded-xl border"
                  style={{ borderColor: theme.primary, background: theme.accent }}
                >
                  <img
                    src={brand.ownerImage}
                    className="w-14 h-14 rounded-full object-cover shrink-0"
                    alt={brand.ownerName}
                  />
                  <div>
                    <div className="font-bold">{brand.ownerName}</div>
                    <div className="text-xs text-muted-foreground">
                      {brand.ownerTitle} · License No: {brand.licenseNo}
                    </div>
                  </div>
                </div>
              </>
            )}
            <ConfiguredPageSections
              page={aboutPage}
              sections={content.pageSections}
              theme={theme}
            />
          </div>
          <div className="relative">
            <img
              src={brand.banner}
              className="rounded-2xl w-full h-72 object-cover shadow-card"
              alt={store.name}
              onError={(event) => {
                event.currentTarget.style.display = "none";
              }}
            />
            {details.verified && (
              <div className="absolute bottom-4 right-4 bg-background rounded-xl px-3 py-2 shadow-lg text-xs">
                <div className="font-bold flex items-center gap-1">
                  <ShieldCheck
                    className="w-3.5 h-3.5"
                    style={{ color: theme.primary }}
                  />{" "}
                  Verified Pharmacy
                </div>
                {brand.licenseNo && (
                  <div className="text-muted-foreground mt-0.5">
                    Pharmacy license: {brand.licenseNo}
                  </div>
                )}
                {details.drugLicenseNumber && (
                  <div className="text-muted-foreground mt-0.5">
                    Drug license: {details.drugLicenseNumber}
                  </div>
                )}
                {details.gstNumber && (
                  <div className="text-muted-foreground mt-0.5">
                    GST: {details.gstNumber}
                  </div>
                )}
                {details.licenseExpiryDate && (
                  <div className="text-muted-foreground mt-0.5">
                    License expires: {details.licenseExpiryDate}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      <section id="contact" className="container mt-14">
        <SectionTitle
          title={contactPage?.title || "Visit us or get in touch"}
          subtitle={contactPage?.description || "We are here to help"}
          theme={theme}
        />
        <div className="grid md:grid-cols-2 gap-4">
          <Card className="p-5 space-y-3">
            <ContactRow
              icon={MapPin}
              label="Address"
              value={
                [store.address, `Delivery radius ${details.deliveryRadius}`]
                  .filter(Boolean)
                  .join(" · ") || "Address not provided"
              }
              color={theme.primary}
            />
            <ContactRow
              icon={Clock}
              label="Store Hours"
              value={store.hours}
              color={theme.primary}
            />
            {brand.contact && (
              <ContactRow
                icon={PhoneCall}
                label="Call"
                value={brand.contact}
                color={theme.primary}
                href={`tel:${brand.contact}`}
              />
            )}
            {brand.whatsapp && (
              <ContactRow
                icon={MessageCircle}
                label="WhatsApp"
                value={brand.whatsapp}
                color={theme.primary}
                href={`https://wa.me/${brand.whatsapp.replace(/\D/g, "")}`}
              />
            )}
            {store.supportEmail && (
              <ContactRow
                icon={Send}
                label="Email"
                value={store.supportEmail}
                color={theme.primary}
                href={`mailto:${store.supportEmail}`}
              />
            )}
            <div className="flex flex-wrap gap-2 pt-2">
              {details.minimumOrder != null && (
                <InfoBadge
                  text={`Minimum order ₹${details.minimumOrder}`}
                  theme={theme}
                />
              )}
              {details.deliveryCharge != null && (
                <InfoBadge
                  text={`Delivery ₹${details.deliveryCharge}`}
                  theme={theme}
                />
              )}
              {details.freeDeliveryAbove != null && (
                <InfoBadge
                  text={`Free delivery above ₹${details.freeDeliveryAbove}`}
                  theme={theme}
                />
              )}
              {details.pickupEnabled && (
                <InfoBadge text="Store pickup available" theme={theme} />
              )}
              {details.sameDayDelivery && (
                <InfoBadge text="Same-day delivery" theme={theme} />
              )}
              {details.expressDelivery && (
                <InfoBadge text="Express delivery" theme={theme} />
              )}
              {details.paymentOptions && (
                <InfoBadge
                  text={`Payments: ${details.paymentOptions}`}
                  theme={theme}
                />
              )}
              {details.deliveryEnabled === false && (
                <InfoBadge text="Delivery unavailable" theme={theme} />
              )}
            </div>
            {content.deliveryZones?.length > 0 && (
              <div className="pt-3 border-t border-border">
                <div className="text-[11px] uppercase font-bold text-muted-foreground mb-2">
                  Delivery areas
                </div>
                <div className="flex flex-wrap gap-2">
                  {content.deliveryZones.map((zone) => (
                    <InfoBadge
                      key={zone.id || zone.zoneName}
                      text={[
                        zone.zoneName || zone.postalCode,
                        zone.deliveryCharge != null
                          ? `₹${zone.deliveryCharge}`
                          : null,
                      ]
                        .filter(Boolean)
                        .join(" · ")}
                      theme={theme}
                    />
                  ))}
                </div>
              </div>
            )}
            <div className="pt-3 border-t border-border">
              <div className="text-xs text-muted-foreground mb-2 font-semibold uppercase">
                Send us a message
              </div>
              <div className="flex gap-2">
                <Input placeholder="Your message..." className="h-10" />
                <Button
                  className="rounded-full text-white h-10 px-4"
                  style={{ background: theme.primary }}
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </Card>
          <Card className="overflow-hidden">
            <div
              className="relative h-72 md:h-full min-h-[280px] flex items-center justify-center"
              style={{ background: theme.accent }}
            >
              <div className="flex flex-col items-center">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center shadow-glow"
                  style={{ background: theme.primary }}
                >
                  <MapPin className="w-5 h-5 text-white" />
                </div>
                <div
                  className="mt-2 bg-background px-3 py-1.5 rounded-full text-xs font-bold shadow"
                  style={{ color: theme.primary }}
                >
                  {store.name}
                </div>
              </div>
              <a
                href={`https://maps.google.com/?q=${encodeURIComponent(
                  store.latitude != null && store.longitude != null
                    ? `${store.latitude},${store.longitude}`
                    : store.address,
                )}`}
                target="_blank"
                rel="noreferrer"
                className="absolute bottom-3 right-3 bg-background rounded-full px-3 py-1.5 text-xs font-semibold shadow inline-flex items-center gap-1 hover:shadow-md"
              >
                <ExternalLink className="w-3 h-3" /> Directions
              </a>
            </div>
          </Card>
        </div>
        <ConfiguredPageSections
          page={contactPage}
          sections={content.pageSections}
          theme={theme}
        />
      </section>

      {privacyPages.map((page) => (
        <section
          key={page.id || page.slug}
          id={page.slug}
          className="container mt-14"
        >
          <SectionTitle
            title={page.title || page.pageType}
            subtitle={page.description}
            theme={theme}
          />
          <ConfiguredPageSections
            page={page}
            sections={content.pageSections}
            theme={theme}
          />
          {(content.policies || [])
            .filter(
              (policy) =>
                policy.policyType?.toLowerCase() ===
                page.pageType?.toLowerCase(),
            )
            .map((policy) => (
              <Card key={policy.id || policy.policyType} className="p-5 mt-3">
                <h3 className="font-bold">{policy.title || page.title}</h3>
                <p className="text-sm text-muted-foreground mt-2 whitespace-pre-line">
                  {policy.content}
                </p>
              </Card>
            ))}
        </section>
      ))}

      {standalonePolicies.length > 0 && (
        <section className="container mt-14">
          <SectionTitle title="Store policies" subtitle={undefined} theme={theme} />
          <div className="grid md:grid-cols-2 gap-4">
            {standalonePolicies.map((policy) => (
              <Card key={policy.id || policy.policyType} className="p-5">
                <h3 className="font-bold">{policy.title || policy.policyType}</h3>
                <p className="text-sm text-muted-foreground mt-2 whitespace-pre-line">
                  {policy.content}
                </p>
              </Card>
            ))}
          </div>
        </section>
      )}

      <section className="container mt-14">
        <NotFoundBlock
          store={store}
          theme={theme}
          onSearchAll={onSearchAll}
          onNotify={onNotify}
        />
      </section>
      <StoreFooter
        store={store}
        brand={brand}
        details={details}
        content={content}
        theme={theme}
        onMarketplace={onMarketplace}
        onScroll={onScroll}
      />
    </>
  );
}

export function SectionTitle({ title, subtitle, theme }) {
  return (
    <div className="mb-4">
      <h2
        className="text-xl md:text-2xl font-extrabold tracking-tight"
        style={{ color: theme.dark || "inherit" }}
      >
        {title}
      </h2>
      {subtitle && (
        <p className="text-sm text-muted-foreground mt-0.5">{subtitle}</p>
      )}
    </div>
  );
}
function parseConfiguration(value) {
  if (typeof value !== "string") return value || {};
  try {
    return JSON.parse(value);
  } catch {
    return {};
  }
}
function ConfiguredPageSections({ page, sections = [], theme }) {
  if (!page) return null;
  const pageSections = sections
    .filter(
      (section) =>
        String(section.pageId) === String(page.id) && section.active !== false,
    )
    .sort((left, right) => (left.displayOrder || 0) - (right.displayOrder || 0));
  if (!pageSections.length) return null;
  return (
    <div className="mt-5 space-y-3">
      {pageSections.map((section) => (
        <Card
          key={section.id || `${section.sectionType}-${section.displayOrder}`}
          className="overflow-hidden"
        >
          {section.imageUrl && (
            <img
              src={section.imageUrl}
              alt={section.title || page.title}
              className="w-full max-h-64 object-cover"
              onError={(event) => {
                event.currentTarget.style.display = "none";
              }}
            />
          )}
          <div className="p-4">
            {section.title && (
              <h3 className="font-bold" style={{ color: theme.primary }}>
                {section.title}
              </h3>
            )}
            {section.subtitle && (
              <p className="text-sm font-medium mt-1">{section.subtitle}</p>
            )}
            {section.content && (
              <p className="text-sm text-muted-foreground mt-2 whitespace-pre-line">
                {section.content}
              </p>
            )}
          </div>
        </Card>
      ))}
    </div>
  );
}
function InfoBadge({ text, theme }) {
  return (
    <span
      className="rounded-full px-3 py-1 text-xs font-semibold"
      style={{ color: theme.primary, background: theme.accent }}
    >
      {text}
    </span>
  );
}
function MiniStat({ n, label, color }) {
  return (
    <div className="text-center p-3 rounded-xl bg-muted/40">
      <div className="text-2xl font-extrabold" style={{ color }}>
        {n}
      </div>
      <div className="text-xs text-muted-foreground">{label}</div>
    </div>
  );
}
function ContactRow({ icon: Icon, label, value, color, href = undefined }) {
  const Wrapper = href ? "a" : "div";
  return (
    <Wrapper
      href={href}
      target={href?.startsWith("http") ? "_blank" : undefined}
      rel="noreferrer"
      className="flex items-start gap-3 p-2 rounded-lg hover:bg-muted/50 transition"
    >
      <div
        className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
        style={{ background: `${color}20`, color }}
      >
        <Icon className="w-4 h-4" />
      </div>
      <div className="min-w-0">
        <div className="text-[11px] uppercase font-bold text-muted-foreground">
          {label}
        </div>
        <div className="text-sm font-medium truncate">{value}</div>
      </div>
    </Wrapper>
  );
}
function NotFoundBlock({ store, theme, onSearchAll, onNotify }) {
  return (
    <div
      className="rounded-2xl p-6 md:p-8 text-center"
      style={{ background: theme.accent }}
    >
      <div className="text-5xl mb-3">🔍</div>
      <h2 className="text-xl md:text-2xl font-bold">
        Can't find your medicine at {store.name}?
      </h2>
      <p className="text-sm text-muted-foreground mt-2 max-w-lg mx-auto">
        Our pharmacist can source it for you, or you can check other verified
        pharmacies nearby.
      </p>
      <div className="mt-5 flex flex-col sm:flex-row gap-2 justify-center">
        <Button
          size="lg"
          onClick={onNotify}
          className="rounded-full text-white font-semibold"
          style={{ background: theme.primary }}
        >
          <Sparkles className="w-4 h-4 mr-2" /> Notify me when available
        </Button>
        <Button
          size="lg"
          variant="outline"
          onClick={onSearchAll}
          className="rounded-full font-semibold border-2"
          style={{ borderColor: theme.primary, color: theme.primary }}
        >
          Search across all Lylac One pharmacies
        </Button>
      </div>
    </div>
  );
}
function StoreFooter({
  store,
  brand,
  details,
  content,
  theme,
  onMarketplace,
  onScroll,
}) {
  const policyLinks = content.policies?.length
    ? content.policies
    : content.hasBackendConfiguration
      ? []
      : [
        { title: "Privacy Policy" },
        { title: "Terms & Conditions" },
        { title: "Return Policy" },
      ];
  const socialLinks =
    content.socialLinks?.filter((link) => link.active !== false && link.url) ||
    [];
  const socialIcons = {
    facebook: Facebook,
    instagram: Instagram,
    twitter: Twitter,
    youtube: Youtube,
  };
  return (
    <footer className="mt-14 text-white" style={{ background: theme.dark }}>
      <div className="container py-10 grid md:grid-cols-4 gap-8">
        <div className="md:col-span-2">
          <div className="font-bold text-lg">{store.name}</div>
          <div className="text-xs opacity-80 italic">{brand.slogan}</div>
          <p className="text-sm opacity-80 mt-3 max-w-md">
            {details.description}
          </p>
          <div className="mt-4 flex items-center gap-2">
            {socialLinks.length ? (
              socialLinks.map((link) => {
                const Icon =
                  socialIcons[link.platform?.toLowerCase()] || ExternalLink;
                return (
                  <SocialIcon
                    key={link.id || link.url}
                    icon={Icon}
                    href={link.url}
                  />
                );
              })
            ) : !content.hasBackendConfiguration ? (
              <>
                <SocialIcon icon={Facebook} />
                <SocialIcon icon={Instagram} />
                <SocialIcon icon={Twitter} />
                <SocialIcon icon={Youtube} />
              </>
            ) : null}
          </div>
        </div>
        <div>
          <h3 className="font-bold text-sm uppercase mb-3">Store</h3>
          <ul className="space-y-2 text-sm opacity-80">
            <li>
              <Clock className="inline w-3.5 h-3.5 mr-2" />
              {store.hours}
            </li>
            <li>
              <MapPin className="inline w-3.5 h-3.5 mr-2" />
              {store.address}
            </li>
            <li>
              <Phone className="inline w-3.5 h-3.5 mr-2" />
              {brand.contact}
            </li>
          </ul>
        </div>
        <div>
          <h3 className="font-bold text-sm uppercase mb-3">Policies</h3>
          <ul className="space-y-2 text-sm opacity-80">
            {policyLinks.map((policy) => (
              <li key={policy.id || policy.policyType || policy.title}>
                {policy.title || policy.policyType}
              </li>
            ))}
            <li onClick={() => onScroll("about")} className="cursor-pointer">
              About Us
            </li>
            <li onClick={() => onScroll("contact")} className="cursor-pointer">
              Contact Us
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 py-4 text-center text-xs opacity-80">
        <button onClick={onMarketplace}>
          Powered by <span className="font-bold text-white">Lylac One</span>
        </button>
      </div>
    </footer>
  );
}
function SocialIcon({ icon: Icon, href = undefined }) {
  const Wrapper = href ? "a" : "button";
  return (
    <Wrapper
      href={href}
      target={href ? "_blank" : undefined}
      rel={href ? "noreferrer" : undefined}
      aria-label="Social media"
      className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition"
    >
      <Icon className="w-4 h-4" />
    </Wrapper>
  );
}
