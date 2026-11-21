package com.salesmanager.shop.populator.store;

import static java.util.Comparator.comparing;
import static java.util.Comparator.nullsFirst;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Component;

import com.salesmanager.core.model.merchant.MerchantStore;
import com.salesmanager.core.model.storefront.StoreBusinessHours;
import com.salesmanager.core.model.storefront.StoreDeliveryZone;
import com.salesmanager.core.model.storefront.StoreHomepageSection;
import com.salesmanager.core.model.storefront.StoreNavigation;
import com.salesmanager.core.model.storefront.StorePage;
import com.salesmanager.core.model.storefront.StorePageSection;
import com.salesmanager.core.model.storefront.StorePolicy;
import com.salesmanager.core.model.storefront.StoreSocialLink;
import com.salesmanager.shop.model.store.ReadableMerchantStoreDetails;
import com.salesmanager.shop.model.store.ReadableMerchantStoreDetails.BusinessHoursDetails;
import com.salesmanager.shop.model.store.ReadableMerchantStoreDetails.DeliveryConfigDetails;
import com.salesmanager.shop.model.store.ReadableMerchantStoreDetails.DeliveryZoneDetails;
import com.salesmanager.shop.model.store.ReadableMerchantStoreDetails.HomepageSectionDetails;
import com.salesmanager.shop.model.store.ReadableMerchantStoreDetails.NavigationDetails;
import com.salesmanager.shop.model.store.ReadableMerchantStoreDetails.PageDetails;
import com.salesmanager.shop.model.store.ReadableMerchantStoreDetails.PageSectionDetails;
import com.salesmanager.shop.model.store.ReadableMerchantStoreDetails.PaymentConfigDetails;
import com.salesmanager.shop.model.store.ReadableMerchantStoreDetails.PolicyDetails;
import com.salesmanager.shop.model.store.ReadableMerchantStoreDetails.SeoConfigDetails;
import com.salesmanager.shop.model.store.ReadableMerchantStoreDetails.SocialLinkDetails;
import com.salesmanager.shop.model.store.ReadableMerchantStoreDetails.ThemeConfigDetails;

@Component
public class ReadableMerchantStoreDetailsPopulator {

    public ReadableMerchantStoreDetails populate(MerchantStore source, ReadableMerchantStoreDetails target) {
        return populate(source, target, false);
    }

    public ReadableMerchantStoreDetails populate(MerchantStore source, ReadableMerchantStoreDetails target,
            boolean includeInactive) {
        target = target == null ? new ReadableMerchantStoreDetails() : target;
        target.setTemplate(source.getStoreTemplate());

        if (source.getLanguages() != null) {
            target.setSupportedLanguageCodes(source.getLanguages().stream()
                    .map(language -> language.getCode())
                    .sorted()
                    .collect(Collectors.toList()));
        }

        if (source.getSeoConfig() != null) {
            SeoConfigDetails seo = new SeoConfigDetails();
            seo.setMetaTitle(source.getSeoConfig().getMetaTitle());
            seo.setMetaDescription(source.getSeoConfig().getMetaDescription());
            seo.setMetaKeywords(source.getSeoConfig().getMetaKeywords());
            seo.setOgTitle(source.getSeoConfig().getOgTitle());
            seo.setOgDescription(source.getSeoConfig().getOgDescription());
            seo.setOgImage(source.getSeoConfig().getOgImage());
            seo.setCanonicalUrl(source.getSeoConfig().getCanonicalUrl());
            seo.setRobotsIndex(source.getSeoConfig().isRobotsIndex());
            seo.setRobotsFollow(source.getSeoConfig().isRobotsFollow());
            seo.setStructuredData(source.getSeoConfig().getStructuredData());
            target.setSeoConfig(seo);
        }

        if (source.getDeliveryConfig() != null) {
            DeliveryConfigDetails delivery = new DeliveryConfigDetails();
            delivery.setDeliveryEnabled(source.getDeliveryConfig().isDeliveryEnabled());
            delivery.setDeliveryRadiusKm(source.getDeliveryConfig().getDeliveryRadiusKm());
            delivery.setMinimumOrderAmount(source.getDeliveryConfig().getMinimumOrderAmount());
            delivery.setDeliveryCharge(source.getDeliveryConfig().getDeliveryCharge());
            delivery.setFreeDeliveryAbove(source.getDeliveryConfig().getFreeDeliveryAbove());
            delivery.setEstimatedDeliveryMin(source.getDeliveryConfig().getEstimatedDeliveryMin());
            delivery.setEstimatedDeliveryMax(source.getDeliveryConfig().getEstimatedDeliveryMax());
            delivery.setSameDayDelivery(source.getDeliveryConfig().isSameDayDelivery());
            delivery.setExpressDelivery(source.getDeliveryConfig().isExpressDelivery());
            delivery.setPickupEnabled(source.getDeliveryConfig().isPickupEnabled());
            target.setDeliveryConfig(delivery);
        }

        if (source.getPaymentConfig() != null
                && (includeInactive || source.getPaymentConfig().isActive())) {
            PaymentConfigDetails payment = new PaymentConfigDetails();
            payment.setCodEnabled(source.getPaymentConfig().isCodEnabled());
            payment.setOnlinePaymentEnabled(source.getPaymentConfig().isOnlinePaymentEnabled());
            payment.setUpiEnabled(source.getPaymentConfig().isUpiEnabled());
            payment.setPaymentProvider(source.getPaymentConfig().getPaymentProvider());
            payment.setActive(source.getPaymentConfig().isActive());
            target.setPaymentConfig(payment);
        }

        if (source.getThemeConfig() != null) {
            ThemeConfigDetails theme = new ThemeConfigDetails();
            theme.setThemeName(source.getThemeConfig().getThemeName());
            theme.setPrimaryColor(source.getThemeConfig().getPrimaryColor());
            theme.setSecondaryColor(source.getThemeConfig().getSecondaryColor());
            theme.setAccentColor(source.getThemeConfig().getAccentColor());
            theme.setBackgroundColor(source.getThemeConfig().getBackgroundColor());
            theme.setTextColor(source.getThemeConfig().getTextColor());
            theme.setFontFamily(source.getThemeConfig().getFontFamily());
            theme.setBorderRadius(source.getThemeConfig().getBorderRadius());
            theme.setButtonStyle(source.getThemeConfig().getButtonStyle());
            theme.setCardStyle(source.getThemeConfig().getCardStyle());
            theme.setHeaderStyle(source.getThemeConfig().getHeaderStyle());
            theme.setFooterStyle(source.getThemeConfig().getFooterStyle());
            theme.setCustomCss(source.getThemeConfig().getCustomCss());
            target.setThemeConfig(theme);
        }

        if (source.getBusinessHours() != null) {
            List<BusinessHoursDetails> hours = source.getBusinessHours().stream()
                    .sorted(comparing(StoreBusinessHours::getDayOfWeek, nullsFirst(Integer::compareTo)))
                    .map(this::populateBusinessHours)
                    .collect(Collectors.toList());
            target.setBusinessHours(hours);
        }

        if (source.getDeliveryZones() != null) {
            List<DeliveryZoneDetails> zones = source.getDeliveryZones().stream()
                    .filter(zone -> includeInactive || zone.isActive())
                    .sorted(comparing(StoreDeliveryZone::getZoneName, nullsFirst(String::compareTo)))
                    .map(this::populateDeliveryZone)
                    .collect(Collectors.toList());
            target.setDeliveryZones(zones);
        }

        if (source.getHomepageSections() != null) {
            List<HomepageSectionDetails> sections = source.getHomepageSections().stream()
                    .filter(section -> includeInactive || section.isActive())
                    .sorted(comparing(StoreHomepageSection::getDisplayOrder, nullsFirst(Integer::compareTo)))
                    .map(this::populateHomepageSection)
                    .collect(Collectors.toList());
            target.setHomepageSections(sections);
        }

        if (source.getNavigations() != null) {
            List<NavigationDetails> navigations = source.getNavigations().stream()
                    .filter(navigation -> navigation.getParent() == null)
                    .filter(navigation -> includeInactive || navigation.isActive())
                    .sorted(comparing(StoreNavigation::getDisplayOrder, nullsFirst(Integer::compareTo)))
                    .map(navigation -> populateNavigation(navigation, includeInactive))
                    .collect(Collectors.toList());
            target.setNavigations(navigations);
        }

        if (source.getPages() != null) {
            List<PageDetails> pages = source.getPages().stream()
                    .filter(page -> includeInactive || page.isPublished())
                    .sorted(comparing(StorePage::getSlug, nullsFirst(String::compareTo)))
                    .map(page -> populatePage(page, includeInactive))
                    .collect(Collectors.toList());
            target.setPages(pages);
        }

        if (source.getPolicies() != null) {
            List<PolicyDetails> policies = source.getPolicies().stream()
                    .filter(policy -> includeInactive || policy.isActive())
                    .sorted(comparing(StorePolicy::getPolicyType, nullsFirst(String::compareTo)))
                    .map(this::populatePolicy)
                    .collect(Collectors.toList());
            target.setPolicies(policies);
        }

        if (source.getSocialLinks() != null) {
            List<SocialLinkDetails> links = source.getSocialLinks().stream()
                    .filter(link -> includeInactive || link.isActive())
                    .sorted(comparing(StoreSocialLink::getDisplayOrder, nullsFirst(Integer::compareTo)))
                    .map(this::populateSocialLink)
                    .collect(Collectors.toList());
            target.setSocialLinks(links);
        }

        return target;
    }

    private BusinessHoursDetails populateBusinessHours(StoreBusinessHours source) {
        BusinessHoursDetails target = new BusinessHoursDetails();
        target.setDayOfWeek(source.getDayOfWeek());
        target.setOpeningTime(source.getOpeningTime());
        target.setClosingTime(source.getClosingTime());
        target.setClosed(source.isClosed());
        target.setTwentyFourHours(source.isTwentyFourHours());
        return target;
    }

    private DeliveryZoneDetails populateDeliveryZone(StoreDeliveryZone source) {
        DeliveryZoneDetails target = new DeliveryZoneDetails();
        target.setZoneName(source.getZoneName());
        target.setPostalCode(source.getPostalCode());
        target.setDeliveryCharge(source.getDeliveryCharge());
        target.setMinimumOrderAmount(source.getMinimumOrderAmount());
        target.setFreeDeliveryAbove(source.getFreeDeliveryAbove());
        target.setEstimatedDeliveryMin(source.getEstimatedDeliveryMin());
        target.setEstimatedDeliveryMax(source.getEstimatedDeliveryMax());
        target.setActive(source.isActive());
        return target;
    }

    private HomepageSectionDetails populateHomepageSection(StoreHomepageSection source) {
        HomepageSectionDetails target = new HomepageSectionDetails();
        target.setSectionType(source.getSectionType());
        target.setTitle(source.getTitle());
        target.setSubtitle(source.getSubtitle());
        target.setImageUrl(source.getImageUrl());
        target.setConfiguration(source.getConfiguration());
        target.setDisplayOrder(source.getDisplayOrder());
        target.setActive(source.isActive());
        return target;
    }

    private NavigationDetails populateNavigation(StoreNavigation source, boolean includeInactive) {
        NavigationDetails target = new NavigationDetails();
        target.setLabel(source.getLabel());
        target.setUrl(source.getUrl());
        target.setIcon(source.getIcon());
        target.setDisplayOrder(source.getDisplayOrder());
        target.setOpenNewTab(source.isOpenNewTab());
        target.setActive(source.isActive());
        if (source.getChildren() != null) {
            target.setChildren(source.getChildren().stream()
                    .filter(child -> includeInactive || child.isActive())
                    .sorted(comparing(StoreNavigation::getDisplayOrder, nullsFirst(Integer::compareTo)))
                    .map(child -> populateNavigation(child, includeInactive))
                    .collect(Collectors.toList()));
        } else {
            target.setChildren(new ArrayList<>());
        }
        return target;
    }

    private PageDetails populatePage(StorePage source, boolean includeInactive) {
        PageDetails target = new PageDetails();
        target.setPageType(source.getPageType());
        target.setSlug(source.getSlug());
        target.setTitle(source.getTitle());
        target.setDescription(source.getDescription());
        target.setPublished(source.isPublished());
        target.setMetaTitle(source.getMetaTitle());
        target.setMetaDescription(source.getMetaDescription());
        target.setVersion(source.getVersion());
        if (source.getSections() != null) {
            target.setSections(source.getSections().stream()
                    .filter(section -> includeInactive || section.isActive())
                    .sorted(comparing(StorePageSection::getDisplayOrder, nullsFirst(Integer::compareTo)))
                    .map(this::populatePageSection)
                    .collect(Collectors.toList()));
        } else {
            target.setSections(new ArrayList<>());
        }
        return target;
    }

    private PageSectionDetails populatePageSection(StorePageSection source) {
        PageSectionDetails target = new PageSectionDetails();
        target.setSectionType(source.getSectionType());
        target.setTitle(source.getTitle());
        target.setSubtitle(source.getSubtitle());
        target.setImageUrl(source.getImageUrl());
        target.setContent(source.getContent());
        target.setConfiguration(source.getConfiguration());
        target.setDisplayOrder(source.getDisplayOrder());
        target.setActive(source.isActive());
        return target;
    }

    private PolicyDetails populatePolicy(StorePolicy source) {
        PolicyDetails target = new PolicyDetails();
        target.setPolicyType(source.getPolicyType());
        target.setTitle(source.getTitle());
        target.setContent(source.getContent());
        target.setActive(source.isActive());
        return target;
    }

    private SocialLinkDetails populateSocialLink(StoreSocialLink source) {
        SocialLinkDetails target = new SocialLinkDetails();
        target.setPlatform(source.getPlatform());
        target.setUrl(source.getUrl());
        target.setDisplayOrder(source.getDisplayOrder());
        target.setActive(source.isActive());
        return target;
    }
}
