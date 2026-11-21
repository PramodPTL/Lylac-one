package com.salesmanager.shop.model.store;

import java.util.List;

import com.salesmanager.shop.model.references.PersistableAddress;
import com.salesmanager.shop.model.storefront.delivery.PersistableStoreDeliveryConfig;
import com.salesmanager.shop.model.storefront.delivery.PersistableStoreDeliveryZone;
import com.salesmanager.shop.model.storefront.homepage.PersistableStoreHomepageSection;
import com.salesmanager.shop.model.storefront.hours.PersistableStoreBusinessHours;
import com.salesmanager.shop.model.storefront.navigation.PersistableStoreNavigation;
import com.salesmanager.shop.model.storefront.page.PersistableStorePage;
import com.salesmanager.shop.model.storefront.payment.PersistableStorePaymentConfig;
import com.salesmanager.shop.model.storefront.policy.PersistableStorePolicy;
import com.salesmanager.shop.model.storefront.seo.PersistableStoreSeoConfig;
import com.salesmanager.shop.model.storefront.social.PersistableStoreSocialLink;
import com.salesmanager.shop.model.storefront.theme.PersistableStoreThemeConfig;

public class PersistableMerchantStore extends MerchantStoreEntity {
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private PersistableAddress address;
	//code of parent store (can be null if retailer)
	private String retailerStore;
	private List<String> supportedLanguages;
	private List<PersistableStoreBusinessHours> businessHours;
	private PersistableStoreDeliveryConfig deliveryConfig;
	private List<PersistableStoreDeliveryZone> deliveryZones;
	private List<PersistableStoreHomepageSection> homepageSections;
	private List<PersistableStoreNavigation> navigations;
	private List<PersistableStorePage> pages;
	private PersistableStorePaymentConfig paymentConfig;
	private List<PersistableStorePolicy> policies;
	private List<PersistableStoreSocialLink> socialLinks;
	private PersistableStoreThemeConfig themeConfig;

	public List<String> getSupportedLanguages() {
		return supportedLanguages;
	}

	public void setSupportedLanguages(List<String> supportedLanguages) {
		this.supportedLanguages = supportedLanguages;
	}

	public List<PersistableStoreBusinessHours> getBusinessHours() {
		return businessHours;
	}

	public void setBusinessHours(List<PersistableStoreBusinessHours> businessHours) {
		this.businessHours = businessHours;
	}

	public PersistableStoreDeliveryConfig getDeliveryConfig() {
		return deliveryConfig;
	}

	public void setDeliveryConfig(PersistableStoreDeliveryConfig deliveryConfig) {
		this.deliveryConfig = deliveryConfig;
	}

	public List<PersistableStoreDeliveryZone> getDeliveryZones() {
		return deliveryZones;
	}

	public void setDeliveryZones(List<PersistableStoreDeliveryZone> deliveryZones) {
		this.deliveryZones = deliveryZones;
	}

	public List<PersistableStoreHomepageSection> getHomepageSections() {
		return homepageSections;
	}

	public void setHomepageSections(List<PersistableStoreHomepageSection> homepageSections) {
		this.homepageSections = homepageSections;
	}

	public List<PersistableStoreNavigation> getNavigations() {
		return navigations;
	}

	public void setNavigations(List<PersistableStoreNavigation> navigations) {
		this.navigations = navigations;
	}

	public List<PersistableStorePage> getPages() {
		return pages;
	}

	public void setPages(List<PersistableStorePage> pages) {
		this.pages = pages;
	}

	public PersistableStorePaymentConfig getPaymentConfig() {
		return paymentConfig;
	}

	public void setPaymentConfig(PersistableStorePaymentConfig paymentConfig) {
		this.paymentConfig = paymentConfig;
	}

	public List<PersistableStorePolicy> getPolicies() {
		return policies;
	}

	public void setPolicies(List<PersistableStorePolicy> policies) {
		this.policies = policies;
	}

	public List<PersistableStoreSocialLink> getSocialLinks() {
		return socialLinks;
	}

	public void setSocialLinks(List<PersistableStoreSocialLink> socialLinks) {
		this.socialLinks = socialLinks;
	}

	public PersistableStoreThemeConfig getThemeConfig() {
		return themeConfig;
	}

	public void setThemeConfig(PersistableStoreThemeConfig themeConfig) {
		this.themeConfig = themeConfig;
	}

	public PersistableAddress getAddress() {
		return address;
	}

	public void setAddress(PersistableAddress address) {
		this.address = address;
	}

  public String getRetailerStore() {
    return retailerStore;
  }

  public void setRetailerStore(String retailerStore) {
    this.retailerStore = retailerStore;
  }

	private PersistableStoreSeoConfig seoConfig;
	public PersistableStoreSeoConfig getSeoConfig() {
		return seoConfig;
	}

	public void setSeoConfig(PersistableStoreSeoConfig seoConfig) {
		this.seoConfig = seoConfig;
	}

}
