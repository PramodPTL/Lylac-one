package com.salesmanager.test.shop.populator.store;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertSame;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

import java.math.BigDecimal;
import java.time.LocalTime;
import java.util.Arrays;
import java.util.Collections;

import org.junit.Test;

import com.salesmanager.core.business.services.reference.currency.CurrencyService;
import com.salesmanager.core.business.services.reference.language.LanguageService;
import com.salesmanager.core.model.merchant.MerchantStore;
import com.salesmanager.core.model.reference.currency.Currency;
import com.salesmanager.core.model.reference.language.Language;
import com.salesmanager.shop.model.store.PersistableMerchantStore;
import com.salesmanager.shop.model.storefront.delivery.PersistableStoreDeliveryConfig;
import com.salesmanager.shop.model.storefront.delivery.PersistableStoreDeliveryZone;
import com.salesmanager.shop.model.storefront.homepage.PersistableStoreHomepageSection;
import com.salesmanager.shop.model.storefront.hours.PersistableStoreBusinessHours;
import com.salesmanager.shop.model.storefront.navigation.PersistableStoreNavigation;
import com.salesmanager.shop.model.storefront.page.PersistableStorePage;
import com.salesmanager.shop.model.storefront.page.PersistableStorePageSection;
import com.salesmanager.shop.model.storefront.payment.PersistableStorePaymentConfig;
import com.salesmanager.shop.model.storefront.policy.PersistableStorePolicy;
import com.salesmanager.shop.model.storefront.seo.PersistableStoreSeoConfig;
import com.salesmanager.shop.model.storefront.social.PersistableStoreSocialLink;
import com.salesmanager.shop.model.storefront.theme.PersistableStoreThemeConfig;
import com.salesmanager.shop.populator.store.PersistableMerchantStorePopulator;

public class PersistableMerchantStorePopulatorTest {

    @Test
    public void populateMapsAllStorefrontEntitiesAndTheirOwners() throws Exception {
        Language language = mock(Language.class);
        Currency currency = mock(Currency.class);
        LanguageService languageService = mock(LanguageService.class);
        CurrencyService currencyService = mock(CurrencyService.class);
        when(languageService.getByCode("en")).thenReturn(language);
        when(currencyService.getByCode("USD")).thenReturn(currency);

        PersistableMerchantStore source = new PersistableMerchantStore();
        source.setCode("store");
        source.setName("Store");
        source.setCurrency("USD");
        source.setDefaultLanguage("en");

        PersistableStoreSeoConfig seo = new PersistableStoreSeoConfig();
        seo.setMetaTitle("Store SEO");
        source.setSeoConfig(seo);

        PersistableStoreDeliveryConfig delivery = new PersistableStoreDeliveryConfig();
        delivery.setDeliveryRadiusKm(new BigDecimal("5.00"));
        source.setDeliveryConfig(delivery);

        PersistableStorePaymentConfig payment = new PersistableStorePaymentConfig();
        payment.setPaymentProvider("provider");
        source.setPaymentConfig(payment);

        source.setThemeConfig(new PersistableStoreThemeConfig());
        source.setBusinessHours(Collections.singletonList(businessHours()));
        source.setDeliveryZones(Collections.singletonList(deliveryZone()));
        source.setHomepageSections(Collections.singletonList(homepageSection()));
        source.setNavigations(Collections.singletonList(navigationTree()));
        source.setPages(Collections.singletonList(pageWithSection()));
        source.setPolicies(Collections.singletonList(policy()));
        source.setSocialLinks(Collections.singletonList(socialLink()));

        PersistableMerchantStorePopulator populator = new PersistableMerchantStorePopulator();
        populator.setLanguageService(languageService);
        populator.setCurrencyService(currencyService);

        MerchantStore target = populator.populate(source, null, new MerchantStore(), language);

        assertNotNull(target.getSeoConfig());
        assertSame(target, target.getSeoConfig().getMerchantStore());
        assertEquals("Store SEO", target.getSeoConfig().getMetaTitle());

        assertSame(target, target.getDeliveryConfig().getMerchantStore());
        assertEquals(new BigDecimal("5.00"), target.getDeliveryConfig().getDeliveryRadiusKm());
        assertSame(target, target.getPaymentConfig().getMerchantStore());
        assertSame(target, target.getThemeConfig().getMerchantStore());

        assertEquals(1, target.getBusinessHours().size());
        assertSame(target, target.getBusinessHours().iterator().next().getMerchantStore());
        assertEquals(1, target.getDeliveryZones().size());
        assertSame(target, target.getDeliveryZones().iterator().next().getMerchantStore());
        assertEquals(1, target.getHomepageSections().size());
        assertSame(target, target.getHomepageSections().iterator().next().getMerchantStore());

        assertEquals(2, target.getNavigations().size());
        for (com.salesmanager.core.model.storefront.StoreNavigation navigation : target.getNavigations()) {
            assertSame(target, navigation.getMerchantStore());
        }
        com.salesmanager.core.model.storefront.StoreNavigation child =
                target.getNavigations().stream()
                        .filter(navigation -> navigation.getParent() != null)
                        .findFirst()
                        .orElseThrow(AssertionError::new);
        assertSame(target.getNavigations().stream()
                .filter(navigation -> navigation.getParent() == null)
                .findFirst()
                .orElseThrow(AssertionError::new), child.getParent());

        assertEquals(1, target.getPages().size());
        com.salesmanager.core.model.storefront.StorePage page = target.getPages().iterator().next();
        assertSame(target, page.getMerchantStore());
        assertEquals(1, page.getSections().size());
        assertSame(page, page.getSections().iterator().next().getPage());

        assertEquals(1, target.getPolicies().size());
        assertSame(target, target.getPolicies().iterator().next().getMerchantStore());
        assertEquals(1, target.getSocialLinks().size());
        assertSame(target, target.getSocialLinks().iterator().next().getMerchantStore());
    }

    private PersistableStoreBusinessHours businessHours() {
        PersistableStoreBusinessHours hours = new PersistableStoreBusinessHours();
        hours.setDayOfWeek(1);
        hours.setOpeningTime(LocalTime.of(9, 0));
        hours.setClosingTime(LocalTime.of(17, 0));
        return hours;
    }

    private PersistableStoreDeliveryZone deliveryZone() {
        PersistableStoreDeliveryZone zone = new PersistableStoreDeliveryZone();
        zone.setZoneName("Central");
        return zone;
    }

    private PersistableStoreHomepageSection homepageSection() {
        PersistableStoreHomepageSection section = new PersistableStoreHomepageSection();
        section.setSectionType("hero");
        return section;
    }

    private PersistableStoreNavigation navigationTree() {
        PersistableStoreNavigation root = new PersistableStoreNavigation();
        root.setLabel("Root");
        PersistableStoreNavigation child = new PersistableStoreNavigation();
        child.setLabel("Child");
        root.setChildren(Arrays.asList(child));
        return root;
    }

    private PersistableStorePage pageWithSection() {
        PersistableStorePage page = new PersistableStorePage();
        page.setPageType("about");
        page.setSlug("about");
        page.setTitle("About");
        PersistableStorePageSection section = new PersistableStorePageSection();
        section.setSectionType("content");
        page.setSections(Collections.singletonList(section));
        return page;
    }

    private PersistableStorePolicy policy() {
        PersistableStorePolicy policy = new PersistableStorePolicy();
        policy.setPolicyType("privacy");
        policy.setTitle("Privacy");
        return policy;
    }

    private PersistableStoreSocialLink socialLink() {
        PersistableStoreSocialLink link = new PersistableStoreSocialLink();
        link.setPlatform("facebook");
        link.setUrl("https://example.com");
        return link;
    }
}
