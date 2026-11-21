package com.salesmanager.shop.model.store;

import java.math.BigDecimal;
import java.time.LocalTime;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.salesmanager.shop.model.references.ReadableLanguage;

public class ReadableMerchantStoreDetails extends ReadableMerchantStore {
    private static final long serialVersionUID = 1L;

    private SeoConfigDetails seoConfig;
    private List<BusinessHoursDetails> businessHours;
    private DeliveryConfigDetails deliveryConfig;
    private List<DeliveryZoneDetails> deliveryZones;
    private List<HomepageSectionDetails> homepageSections;
    private List<NavigationDetails> navigations;
    private List<PageDetails> pages;
    private PaymentConfigDetails paymentConfig;
    private List<PolicyDetails> policies;
    private List<SocialLinkDetails> socialLinks;
    private ThemeConfigDetails themeConfig;
    private List<String> supportedLanguageCodes;

    public SeoConfigDetails getSeoConfig() {
        return seoConfig;
    }

    public void setSeoConfig(SeoConfigDetails seoConfig) {
        this.seoConfig = seoConfig;
    }

    public List<BusinessHoursDetails> getBusinessHours() {
        return businessHours;
    }

    public void setBusinessHours(List<BusinessHoursDetails> businessHours) {
        this.businessHours = businessHours;
    }

    public DeliveryConfigDetails getDeliveryConfig() {
        return deliveryConfig;
    }

    public void setDeliveryConfig(DeliveryConfigDetails deliveryConfig) {
        this.deliveryConfig = deliveryConfig;
    }

    public List<DeliveryZoneDetails> getDeliveryZones() {
        return deliveryZones;
    }

    public void setDeliveryZones(List<DeliveryZoneDetails> deliveryZones) {
        this.deliveryZones = deliveryZones;
    }

    public List<HomepageSectionDetails> getHomepageSections() {
        return homepageSections;
    }

    public void setHomepageSections(List<HomepageSectionDetails> homepageSections) {
        this.homepageSections = homepageSections;
    }

    public List<NavigationDetails> getNavigations() {
        return navigations;
    }

    public void setNavigations(List<NavigationDetails> navigations) {
        this.navigations = navigations;
    }

    public List<PageDetails> getPages() {
        return pages;
    }

    public void setPages(List<PageDetails> pages) {
        this.pages = pages;
    }

    public PaymentConfigDetails getPaymentConfig() {
        return paymentConfig;
    }

    public void setPaymentConfig(PaymentConfigDetails paymentConfig) {
        this.paymentConfig = paymentConfig;
    }

    public List<PolicyDetails> getPolicies() {
        return policies;
    }

    public void setPolicies(List<PolicyDetails> policies) {
        this.policies = policies;
    }

    public List<SocialLinkDetails> getSocialLinks() {
        return socialLinks;
    }

    public void setSocialLinks(List<SocialLinkDetails> socialLinks) {
        this.socialLinks = socialLinks;
    }

    public ThemeConfigDetails getThemeConfig() {
        return themeConfig;
    }

    public void setThemeConfig(ThemeConfigDetails themeConfig) {
        this.themeConfig = themeConfig;
    }

    public List<String> getSupportedLanguageCodes() {
        return supportedLanguageCodes;
    }

    public void setSupportedLanguageCodes(List<String> supportedLanguageCodes) {
        this.supportedLanguageCodes = supportedLanguageCodes;
    }

    @JsonIgnore
    @Override
    public int getId() {
        return super.getId();
    }

    @JsonIgnore
    @Override
    public ReadableMerchantStore getParent() {
        return super.getParent();
    }

    @JsonIgnore
    @Override
    public com.salesmanager.shop.model.entity.ReadableAudit getReadableAudit() {
        return super.getReadableAudit();
    }

    @JsonIgnore
    @Override
    public List<ReadableLanguage> getSupportedLanguages() {
        return super.getSupportedLanguages();
    }

    public static class SeoConfigDetails {
        private String metaTitle;
        private String metaDescription;
        private String metaKeywords;
        private String ogTitle;
        private String ogDescription;
        private String ogImage;
        private String canonicalUrl;
        private boolean robotsIndex;
        private boolean robotsFollow;
        private String structuredData;

        public String getMetaTitle() { return metaTitle; }
        public void setMetaTitle(String metaTitle) { this.metaTitle = metaTitle; }
        public String getMetaDescription() { return metaDescription; }
        public void setMetaDescription(String metaDescription) { this.metaDescription = metaDescription; }
        public String getMetaKeywords() { return metaKeywords; }
        public void setMetaKeywords(String metaKeywords) { this.metaKeywords = metaKeywords; }
        public String getOgTitle() { return ogTitle; }
        public void setOgTitle(String ogTitle) { this.ogTitle = ogTitle; }
        public String getOgDescription() { return ogDescription; }
        public void setOgDescription(String ogDescription) { this.ogDescription = ogDescription; }
        public String getOgImage() { return ogImage; }
        public void setOgImage(String ogImage) { this.ogImage = ogImage; }
        public String getCanonicalUrl() { return canonicalUrl; }
        public void setCanonicalUrl(String canonicalUrl) { this.canonicalUrl = canonicalUrl; }
        public boolean isRobotsIndex() { return robotsIndex; }
        public void setRobotsIndex(boolean robotsIndex) { this.robotsIndex = robotsIndex; }
        public boolean isRobotsFollow() { return robotsFollow; }
        public void setRobotsFollow(boolean robotsFollow) { this.robotsFollow = robotsFollow; }
        public String getStructuredData() { return structuredData; }
        public void setStructuredData(String structuredData) { this.structuredData = structuredData; }
    }

    public static class BusinessHoursDetails {
        private Integer dayOfWeek;
        private LocalTime openingTime;
        private LocalTime closingTime;
        private boolean closed;
        private boolean twentyFourHours;

        public Integer getDayOfWeek() { return dayOfWeek; }
        public void setDayOfWeek(Integer dayOfWeek) { this.dayOfWeek = dayOfWeek; }
        public LocalTime getOpeningTime() { return openingTime; }
        public void setOpeningTime(LocalTime openingTime) { this.openingTime = openingTime; }
        public LocalTime getClosingTime() { return closingTime; }
        public void setClosingTime(LocalTime closingTime) { this.closingTime = closingTime; }
        public boolean isClosed() { return closed; }
        public void setClosed(boolean closed) { this.closed = closed; }
        public boolean isTwentyFourHours() { return twentyFourHours; }
        public void setTwentyFourHours(boolean twentyFourHours) { this.twentyFourHours = twentyFourHours; }
    }

    public static class DeliveryConfigDetails {
        private boolean deliveryEnabled;
        private BigDecimal deliveryRadiusKm;
        private BigDecimal minimumOrderAmount;
        private BigDecimal deliveryCharge;
        private BigDecimal freeDeliveryAbove;
        private Integer estimatedDeliveryMin;
        private Integer estimatedDeliveryMax;
        private boolean sameDayDelivery;
        private boolean expressDelivery;
        private boolean pickupEnabled;

        public boolean isDeliveryEnabled() { return deliveryEnabled; }
        public void setDeliveryEnabled(boolean deliveryEnabled) { this.deliveryEnabled = deliveryEnabled; }
        public BigDecimal getDeliveryRadiusKm() { return deliveryRadiusKm; }
        public void setDeliveryRadiusKm(BigDecimal deliveryRadiusKm) { this.deliveryRadiusKm = deliveryRadiusKm; }
        public BigDecimal getMinimumOrderAmount() { return minimumOrderAmount; }
        public void setMinimumOrderAmount(BigDecimal minimumOrderAmount) { this.minimumOrderAmount = minimumOrderAmount; }
        public BigDecimal getDeliveryCharge() { return deliveryCharge; }
        public void setDeliveryCharge(BigDecimal deliveryCharge) { this.deliveryCharge = deliveryCharge; }
        public BigDecimal getFreeDeliveryAbove() { return freeDeliveryAbove; }
        public void setFreeDeliveryAbove(BigDecimal freeDeliveryAbove) { this.freeDeliveryAbove = freeDeliveryAbove; }
        public Integer getEstimatedDeliveryMin() { return estimatedDeliveryMin; }
        public void setEstimatedDeliveryMin(Integer estimatedDeliveryMin) { this.estimatedDeliveryMin = estimatedDeliveryMin; }
        public Integer getEstimatedDeliveryMax() { return estimatedDeliveryMax; }
        public void setEstimatedDeliveryMax(Integer estimatedDeliveryMax) { this.estimatedDeliveryMax = estimatedDeliveryMax; }
        public boolean isSameDayDelivery() { return sameDayDelivery; }
        public void setSameDayDelivery(boolean sameDayDelivery) { this.sameDayDelivery = sameDayDelivery; }
        public boolean isExpressDelivery() { return expressDelivery; }
        public void setExpressDelivery(boolean expressDelivery) { this.expressDelivery = expressDelivery; }
        public boolean isPickupEnabled() { return pickupEnabled; }
        public void setPickupEnabled(boolean pickupEnabled) { this.pickupEnabled = pickupEnabled; }
    }

    public static class DeliveryZoneDetails {
        private String zoneName;
        private String postalCode;
        private BigDecimal deliveryCharge;
        private BigDecimal minimumOrderAmount;
        private BigDecimal freeDeliveryAbove;
        private Integer estimatedDeliveryMin;
        private Integer estimatedDeliveryMax;
        private boolean active;

        public String getZoneName() { return zoneName; }
        public void setZoneName(String zoneName) { this.zoneName = zoneName; }
        public String getPostalCode() { return postalCode; }
        public void setPostalCode(String postalCode) { this.postalCode = postalCode; }
        public BigDecimal getDeliveryCharge() { return deliveryCharge; }
        public void setDeliveryCharge(BigDecimal deliveryCharge) { this.deliveryCharge = deliveryCharge; }
        public BigDecimal getMinimumOrderAmount() { return minimumOrderAmount; }
        public void setMinimumOrderAmount(BigDecimal minimumOrderAmount) { this.minimumOrderAmount = minimumOrderAmount; }
        public BigDecimal getFreeDeliveryAbove() { return freeDeliveryAbove; }
        public void setFreeDeliveryAbove(BigDecimal freeDeliveryAbove) { this.freeDeliveryAbove = freeDeliveryAbove; }
        public Integer getEstimatedDeliveryMin() { return estimatedDeliveryMin; }
        public void setEstimatedDeliveryMin(Integer estimatedDeliveryMin) { this.estimatedDeliveryMin = estimatedDeliveryMin; }
        public Integer getEstimatedDeliveryMax() { return estimatedDeliveryMax; }
        public void setEstimatedDeliveryMax(Integer estimatedDeliveryMax) { this.estimatedDeliveryMax = estimatedDeliveryMax; }
        public boolean isActive() { return active; }
        public void setActive(boolean active) { this.active = active; }
    }

    public static class HomepageSectionDetails {
        private String sectionType;
        private String title;
        private String subtitle;
        private String imageUrl;
        private String configuration;
        private Integer displayOrder;
        private boolean active;

        public String getSectionType() { return sectionType; }
        public void setSectionType(String sectionType) { this.sectionType = sectionType; }
        public String getTitle() { return title; }
        public void setTitle(String title) { this.title = title; }
        public String getSubtitle() { return subtitle; }
        public void setSubtitle(String subtitle) { this.subtitle = subtitle; }
        public String getImageUrl() { return imageUrl; }
        public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }
        public String getConfiguration() { return configuration; }
        public void setConfiguration(String configuration) { this.configuration = configuration; }
        public Integer getDisplayOrder() { return displayOrder; }
        public void setDisplayOrder(Integer displayOrder) { this.displayOrder = displayOrder; }
        public boolean isActive() { return active; }
        public void setActive(boolean active) { this.active = active; }
    }

    public static class NavigationDetails {
        private String label;
        private String url;
        private String icon;
        private Integer displayOrder;
        private boolean openNewTab;
        private boolean active;
        private List<NavigationDetails> children;

        public String getLabel() { return label; }
        public void setLabel(String label) { this.label = label; }
        public String getUrl() { return url; }
        public void setUrl(String url) { this.url = url; }
        public String getIcon() { return icon; }
        public void setIcon(String icon) { this.icon = icon; }
        public Integer getDisplayOrder() { return displayOrder; }
        public void setDisplayOrder(Integer displayOrder) { this.displayOrder = displayOrder; }
        public boolean isOpenNewTab() { return openNewTab; }
        public void setOpenNewTab(boolean openNewTab) { this.openNewTab = openNewTab; }
        public boolean isActive() { return active; }
        public void setActive(boolean active) { this.active = active; }
        public List<NavigationDetails> getChildren() { return children; }
        public void setChildren(List<NavigationDetails> children) { this.children = children; }
    }

    public static class PageDetails {
        private String pageType;
        private String slug;
        private String title;
        private String description;
        private boolean published;
        private String metaTitle;
        private String metaDescription;
        private Long version;
        private List<PageSectionDetails> sections;

        public String getPageType() { return pageType; }
        public void setPageType(String pageType) { this.pageType = pageType; }
        public String getSlug() { return slug; }
        public void setSlug(String slug) { this.slug = slug; }
        public String getTitle() { return title; }
        public void setTitle(String title) { this.title = title; }
        public String getDescription() { return description; }
        public void setDescription(String description) { this.description = description; }
        public boolean isPublished() { return published; }
        public void setPublished(boolean published) { this.published = published; }
        public String getMetaTitle() { return metaTitle; }
        public void setMetaTitle(String metaTitle) { this.metaTitle = metaTitle; }
        public String getMetaDescription() { return metaDescription; }
        public void setMetaDescription(String metaDescription) { this.metaDescription = metaDescription; }
        public Long getVersion() { return version; }
        public void setVersion(Long version) { this.version = version; }
        public List<PageSectionDetails> getSections() { return sections; }
        public void setSections(List<PageSectionDetails> sections) { this.sections = sections; }
    }

    public static class PageSectionDetails {
        private String sectionType;
        private String title;
        private String subtitle;
        private String imageUrl;
        private String content;
        private String configuration;
        private Integer displayOrder;
        private boolean active;

        public String getSectionType() { return sectionType; }
        public void setSectionType(String sectionType) { this.sectionType = sectionType; }
        public String getTitle() { return title; }
        public void setTitle(String title) { this.title = title; }
        public String getSubtitle() { return subtitle; }
        public void setSubtitle(String subtitle) { this.subtitle = subtitle; }
        public String getImageUrl() { return imageUrl; }
        public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }
        public String getContent() { return content; }
        public void setContent(String content) { this.content = content; }
        public String getConfiguration() { return configuration; }
        public void setConfiguration(String configuration) { this.configuration = configuration; }
        public Integer getDisplayOrder() { return displayOrder; }
        public void setDisplayOrder(Integer displayOrder) { this.displayOrder = displayOrder; }
        public boolean isActive() { return active; }
        public void setActive(boolean active) { this.active = active; }
    }

    public static class PaymentConfigDetails {
        private boolean codEnabled;
        private boolean onlinePaymentEnabled;
        private boolean upiEnabled;
        private String paymentProvider;
        private boolean active;

        public boolean isCodEnabled() { return codEnabled; }
        public void setCodEnabled(boolean codEnabled) { this.codEnabled = codEnabled; }
        public boolean isOnlinePaymentEnabled() { return onlinePaymentEnabled; }
        public void setOnlinePaymentEnabled(boolean onlinePaymentEnabled) { this.onlinePaymentEnabled = onlinePaymentEnabled; }
        public boolean isUpiEnabled() { return upiEnabled; }
        public void setUpiEnabled(boolean upiEnabled) { this.upiEnabled = upiEnabled; }
        public String getPaymentProvider() { return paymentProvider; }
        public void setPaymentProvider(String paymentProvider) { this.paymentProvider = paymentProvider; }
        public boolean isActive() { return active; }
        public void setActive(boolean active) { this.active = active; }
    }

    public static class PolicyDetails {
        private String policyType;
        private String title;
        private String content;
        private boolean active;

        public String getPolicyType() { return policyType; }
        public void setPolicyType(String policyType) { this.policyType = policyType; }
        public String getTitle() { return title; }
        public void setTitle(String title) { this.title = title; }
        public String getContent() { return content; }
        public void setContent(String content) { this.content = content; }
        public boolean isActive() { return active; }
        public void setActive(boolean active) { this.active = active; }
    }

    public static class SocialLinkDetails {
        private String platform;
        private String url;
        private Integer displayOrder;
        private boolean active;

        public String getPlatform() { return platform; }
        public void setPlatform(String platform) { this.platform = platform; }
        public String getUrl() { return url; }
        public void setUrl(String url) { this.url = url; }
        public Integer getDisplayOrder() { return displayOrder; }
        public void setDisplayOrder(Integer displayOrder) { this.displayOrder = displayOrder; }
        public boolean isActive() { return active; }
        public void setActive(boolean active) { this.active = active; }
    }

    public static class ThemeConfigDetails {
        private String themeName;
        private String primaryColor;
        private String secondaryColor;
        private String accentColor;
        private String backgroundColor;
        private String textColor;
        private String fontFamily;
        private String borderRadius;
        private String buttonStyle;
        private String cardStyle;
        private String headerStyle;
        private String footerStyle;
        private String customCss;

        public String getThemeName() { return themeName; }
        public void setThemeName(String themeName) { this.themeName = themeName; }
        public String getPrimaryColor() { return primaryColor; }
        public void setPrimaryColor(String primaryColor) { this.primaryColor = primaryColor; }
        public String getSecondaryColor() { return secondaryColor; }
        public void setSecondaryColor(String secondaryColor) { this.secondaryColor = secondaryColor; }
        public String getAccentColor() { return accentColor; }
        public void setAccentColor(String accentColor) { this.accentColor = accentColor; }
        public String getBackgroundColor() { return backgroundColor; }
        public void setBackgroundColor(String backgroundColor) { this.backgroundColor = backgroundColor; }
        public String getTextColor() { return textColor; }
        public void setTextColor(String textColor) { this.textColor = textColor; }
        public String getFontFamily() { return fontFamily; }
        public void setFontFamily(String fontFamily) { this.fontFamily = fontFamily; }
        public String getBorderRadius() { return borderRadius; }
        public void setBorderRadius(String borderRadius) { this.borderRadius = borderRadius; }
        public String getButtonStyle() { return buttonStyle; }
        public void setButtonStyle(String buttonStyle) { this.buttonStyle = buttonStyle; }
        public String getCardStyle() { return cardStyle; }
        public void setCardStyle(String cardStyle) { this.cardStyle = cardStyle; }
        public String getHeaderStyle() { return headerStyle; }
        public void setHeaderStyle(String headerStyle) { this.headerStyle = headerStyle; }
        public String getFooterStyle() { return footerStyle; }
        public void setFooterStyle(String footerStyle) { this.footerStyle = footerStyle; }
        public String getCustomCss() { return customCss; }
        public void setCustomCss(String customCss) { this.customCss = customCss; }
    }
}
