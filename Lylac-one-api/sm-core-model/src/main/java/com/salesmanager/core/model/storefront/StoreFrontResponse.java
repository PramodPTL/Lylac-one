package com.salesmanager.core.model.storefront;

import java.io.Serializable;
import java.util.List;

public class StoreFrontResponse implements Serializable {

    private static final long serialVersionUID = 1L;

    private Long merchantId;

    private MerchantStoreDetails merchantStore;
    private StoreThemeConfig storeThemeConfig;
    private StoreSeoConfig storeSeoConfig;
    private StoreDeliveryConfig storeDeliveryConfig;
    private List<StoreDeliveryZone> storeDeliveryZones;
    private StorePaymentConfig storePaymentConfig;
    private List<StoreNavigation> storeNavigation;
    private List<StoreHomepageSection> homepageSections;
    private List<StorePage> pages;
    private List<StorePageSection> pageSections;
    private List<StoreSocialLink> socialLinks;
    private List<StorePolicy> policies;
    private List<StoreBusinessHours> businessHours;

    public Long getMerchantId() {
        return merchantId;
    }

    public void setMerchantId(Long merchantId) {
        this.merchantId = merchantId;
    }

    public MerchantStoreDetails getMerchantStore() {
        return merchantStore;
    }

    public void setMerchantStore(MerchantStoreDetails merchantStore) {
        this.merchantStore = merchantStore;
    }

    public StoreThemeConfig getStoreThemeConfig() {
        return storeThemeConfig;
    }

    public void setStoreThemeConfig(StoreThemeConfig storeThemeConfig) {
        this.storeThemeConfig = storeThemeConfig;
    }

    public StoreSeoConfig getStoreSeoConfig() {
        return storeSeoConfig;
    }

    public void setStoreSeoConfig(StoreSeoConfig storeSeoConfig) {
        this.storeSeoConfig = storeSeoConfig;
    }

    public StoreDeliveryConfig getStoreDeliveryConfig() {
        return storeDeliveryConfig;
    }

    public void setStoreDeliveryConfig(StoreDeliveryConfig storeDeliveryConfig) {
        this.storeDeliveryConfig = storeDeliveryConfig;
    }

    public List<StoreDeliveryZone> getStoreDeliveryZones() {
        return storeDeliveryZones;
    }

    public void setStoreDeliveryZones(List<StoreDeliveryZone> storeDeliveryZones) {
        this.storeDeliveryZones = storeDeliveryZones;
    }

    public StorePaymentConfig getStorePaymentConfig() {
        return storePaymentConfig;
    }

    public void setStorePaymentConfig(StorePaymentConfig storePaymentConfig) {
        this.storePaymentConfig = storePaymentConfig;
    }

    public List<StoreNavigation> getStoreNavigation() {
        return storeNavigation;
    }

    public void setStoreNavigation(List<StoreNavigation> storeNavigation) {
        this.storeNavigation = storeNavigation;
    }

    public List<StoreHomepageSection> getHomepageSections() {
        return homepageSections;
    }

    public void setHomepageSections(List<StoreHomepageSection> homepageSections) {
        this.homepageSections = homepageSections;
    }

    public List<StorePage> getPages() {
        return pages;
    }

    public void setPages(List<StorePage> pages) {
        this.pages = pages;
    }

    public List<StorePageSection> getPageSections() {
        return pageSections;
    }

    public void setPageSections(List<StorePageSection> pageSections) {
        this.pageSections = pageSections;
    }

    public List<StoreSocialLink> getSocialLinks() {
        return socialLinks;
    }

    public void setSocialLinks(List<StoreSocialLink> socialLinks) {
        this.socialLinks = socialLinks;
    }

    public List<StorePolicy> getPolicies() {
        return policies;
    }

    public void setPolicies(List<StorePolicy> policies) {
        this.policies = policies;
    }

    public List<StoreBusinessHours> getBusinessHours() {
        return businessHours;
    }

    public void setBusinessHours(List<StoreBusinessHours> businessHours) {
        this.businessHours = businessHours;
    }
}
