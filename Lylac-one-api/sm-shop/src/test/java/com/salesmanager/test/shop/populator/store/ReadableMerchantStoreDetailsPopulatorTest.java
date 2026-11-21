package com.salesmanager.test.shop.populator.store;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertNotNull;

import java.math.BigDecimal;
import java.time.LocalTime;
import java.util.Collections;
import java.util.HashSet;

import org.junit.Test;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.salesmanager.core.model.merchant.MerchantStore;
import com.salesmanager.core.model.storefront.StoreBusinessHours;
import com.salesmanager.core.model.storefront.StoreDeliveryConfig;
import com.salesmanager.core.model.storefront.StoreDeliveryZone;
import com.salesmanager.core.model.storefront.StoreHomepageSection;
import com.salesmanager.core.model.storefront.StoreNavigation;
import com.salesmanager.core.model.storefront.StorePage;
import com.salesmanager.core.model.storefront.StorePageSection;
import com.salesmanager.core.model.storefront.StorePaymentConfig;
import com.salesmanager.core.model.storefront.StorePolicy;
import com.salesmanager.core.model.storefront.StoreSeoConfig;
import com.salesmanager.core.model.storefront.StoreSocialLink;
import com.salesmanager.core.model.storefront.StoreThemeConfig;
import com.salesmanager.shop.model.entity.ReadableAudit;
import com.salesmanager.shop.model.store.ReadableMerchantStoreDetails;
import com.salesmanager.shop.populator.store.ReadableMerchantStoreDetailsPopulator;

public class ReadableMerchantStoreDetailsPopulatorTest {

    @Test
    public void populateMapsStorefrontDetailsWithoutExposingPaymentConfiguration() throws Exception {
        MerchantStore store = new MerchantStore();
        store.setStoreTemplate("pharmacy-default");

        StoreSeoConfig seo = new StoreSeoConfig();
        seo.setMetaTitle("Demo Pharmacy");
        store.setSeoConfig(seo);

        StoreBusinessHours hours = new StoreBusinessHours();
        hours.setDayOfWeek(1);
        hours.setOpeningTime(LocalTime.of(9, 0));
        hours.setClosingTime(LocalTime.of(18, 0));
        store.setBusinessHours(new HashSet<>(Collections.singletonList(hours)));

        StoreDeliveryConfig delivery = new StoreDeliveryConfig();
        delivery.setDeliveryRadiusKm(new BigDecimal("5.00"));
        store.setDeliveryConfig(delivery);

        StoreDeliveryZone zone = new StoreDeliveryZone();
        zone.setZoneName("Central");
        StoreDeliveryZone inactiveZone = new StoreDeliveryZone();
        inactiveZone.setZoneName("Closed zone");
        inactiveZone.setActive(false);
        store.setDeliveryZones(new HashSet<>(java.util.Arrays.asList(zone, inactiveZone)));

        StoreHomepageSection homepageSection = new StoreHomepageSection();
        homepageSection.setSectionType("hero");
        StoreHomepageSection inactiveHomepageSection = new StoreHomepageSection();
        inactiveHomepageSection.setSectionType("hidden");
        inactiveHomepageSection.setActive(false);
        store.setHomepageSections(
                new HashSet<>(java.util.Arrays.asList(homepageSection, inactiveHomepageSection)));

        StoreNavigation root = new StoreNavigation();
        root.setLabel("Shop");
        StoreNavigation child = new StoreNavigation();
        child.setLabel("Medicines");
        child.setParent(root);
        StoreNavigation inactiveChild = new StoreNavigation();
        inactiveChild.setLabel("Hidden");
        inactiveChild.setActive(false);
        inactiveChild.setParent(root);
        root.setChildren(new HashSet<>(java.util.Arrays.asList(child, inactiveChild)));
        store.setNavigations(new HashSet<>(Collections.singletonList(root)));

        StorePage page = new StorePage();
        page.setSlug("about");
        page.setPublished(true);
        StorePageSection pageSection = new StorePageSection();
        pageSection.setSectionType("content");
        page.addSection(pageSection);
        StorePageSection inactivePageSection = new StorePageSection();
        inactivePageSection.setSectionType("hidden");
        inactivePageSection.setActive(false);
        page.addSection(inactivePageSection);
        StorePage unpublishedPage = new StorePage();
        unpublishedPage.setSlug("draft");
        unpublishedPage.setTitle("Draft");
        store.setPages(new HashSet<>(java.util.Arrays.asList(page, unpublishedPage)));

        StorePaymentConfig payment = new StorePaymentConfig();
        payment.setPaymentProvider("example-provider");
        payment.setConfiguration("{\"apiKey\":\"private-value\"}");
        store.setPaymentConfig(payment);

        StorePolicy policy = new StorePolicy();
        policy.setPolicyType("privacy");
        StorePolicy inactivePolicy = new StorePolicy();
        inactivePolicy.setPolicyType("draft");
        inactivePolicy.setActive(false);
        store.setPolicies(new HashSet<>(java.util.Arrays.asList(policy, inactivePolicy)));

        StoreSocialLink socialLink = new StoreSocialLink();
        socialLink.setPlatform("facebook");
        store.setSocialLinks(new HashSet<>(Collections.singletonList(socialLink)));

        StoreThemeConfig theme = new StoreThemeConfig();
        theme.setThemeName("default");
        store.setThemeConfig(theme);

        ReadableMerchantStoreDetails details =
                new ReadableMerchantStoreDetailsPopulator().populate(store, null);
        details.setId(123);
        ReadableAudit audit = new ReadableAudit();
        audit.setUser("internal-user");
        details.setReadableAudit(audit);
        details.setParent(new com.salesmanager.shop.model.store.ReadableMerchantStore());

        assertEquals("Demo Pharmacy", details.getSeoConfig().getMetaTitle());
        assertEquals("pharmacy-default", details.getTemplate());
        assertEquals(LocalTime.of(9, 0), details.getBusinessHours().get(0).getOpeningTime());
        assertEquals(new BigDecimal("5.00"), details.getDeliveryConfig().getDeliveryRadiusKm());
        assertEquals("Central", details.getDeliveryZones().get(0).getZoneName());
        assertEquals(1, details.getDeliveryZones().size());
        assertEquals("hero", details.getHomepageSections().get(0).getSectionType());
        assertEquals(1, details.getHomepageSections().size());
        assertEquals("Shop", details.getNavigations().get(0).getLabel());
        assertEquals("Medicines", details.getNavigations().get(0).getChildren().get(0).getLabel());
        assertEquals(1, details.getNavigations().get(0).getChildren().size());
        assertEquals("about", details.getPages().get(0).getSlug());
        assertEquals("content", details.getPages().get(0).getSections().get(0).getSectionType());
        assertEquals(1, details.getPages().size());
        assertEquals(1, details.getPages().get(0).getSections().size());
        assertEquals("example-provider", details.getPaymentConfig().getPaymentProvider());
        assertEquals("privacy", details.getPolicies().get(0).getPolicyType());
        assertEquals(1, details.getPolicies().size());
        assertEquals("facebook", details.getSocialLinks().get(0).getPlatform());
        assertEquals("default", details.getThemeConfig().getThemeName());

        String responseJson = new ObjectMapper().findAndRegisterModules().writeValueAsString(details);
        assertNotNull(responseJson);
        assertFalse(responseJson.contains("private-value"));
        assertFalse(responseJson.contains("configuration\":\"{"));
        assertFalse(responseJson.contains("\"id\""));
        assertFalse(responseJson.contains("internal-user"));
        assertFalse(responseJson.contains("\"parent\""));

        ReadableMerchantStoreDetails adminDetails =
                new ReadableMerchantStoreDetailsPopulator().populate(store, null, true);
        assertEquals(2, adminDetails.getDeliveryZones().size());
        assertEquals(2, adminDetails.getHomepageSections().size());
        assertEquals(2, adminDetails.getNavigations().get(0).getChildren().size());
        assertEquals(2, adminDetails.getPages().size());
        assertEquals(2, adminDetails.getPages().stream()
                .filter(storePage -> "about".equals(storePage.getSlug()))
                .findFirst()
                .orElseThrow(AssertionError::new)
                .getSections().size());
        assertEquals(2, adminDetails.getPolicies().size());
    }
}
