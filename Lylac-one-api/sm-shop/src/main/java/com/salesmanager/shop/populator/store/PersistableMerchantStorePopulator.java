package com.salesmanager.shop.populator.store;

import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.inject.Inject;

import org.apache.commons.collections4.CollectionUtils;
import org.apache.commons.lang3.StringUtils;
import org.apache.commons.lang3.Validate;
import org.springframework.stereotype.Component;

import com.salesmanager.core.business.constants.Constants;
import com.salesmanager.core.business.exception.ConversionException;
import com.salesmanager.core.business.exception.ServiceException;
import com.salesmanager.core.business.services.merchant.MerchantStoreService;
import com.salesmanager.core.business.services.reference.country.CountryService;
import com.salesmanager.core.business.services.reference.currency.CurrencyService;
import com.salesmanager.core.business.services.reference.language.LanguageService;
import com.salesmanager.core.business.services.reference.zone.ZoneService;
import com.salesmanager.core.business.utils.AbstractDataPopulator;
import com.salesmanager.core.model.merchant.MerchantStore;
import com.salesmanager.core.model.reference.country.Country;
import com.salesmanager.core.model.reference.currency.Currency;
import com.salesmanager.core.model.reference.language.Language;
import com.salesmanager.core.model.reference.zone.Zone;
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
import com.salesmanager.shop.model.references.PersistableAddress;
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
import com.salesmanager.shop.utils.DateUtil;

@Component
public class PersistableMerchantStorePopulator extends AbstractDataPopulator<PersistableMerchantStore, MerchantStore> {

	@Inject
	private CountryService countryService;
	@Inject
	private ZoneService zoneService;
	@Inject
	private LanguageService languageService;
	@Inject
	private CurrencyService currencyService;
	@Inject
	private MerchantStoreService merchantStoreService;
	
	
	@Override
	public MerchantStore populate(PersistableMerchantStore source, MerchantStore target, MerchantStore store,
			Language language) throws ConversionException {

		Validate.notNull(source, "PersistableMerchantStore mst not be null");
		
		if(target == null) {
			target = new MerchantStore();
		}
		
		target.setCode(source.getCode());
		if(source.getId()!=0) {
			target.setId(source.getId());
		}
		
		if(store.getStoreLogo()!=null) {
			target.setStoreLogo(store.getStoreLogo());
		}
		
		if(!StringUtils.isEmpty(source.getInBusinessSince())) {
			try {
				Date dt = DateUtil.getDate(source.getInBusinessSince());
				target.setInBusinessSince(dt);
			} catch(Exception e) {
				throw new ConversionException("Cannot parse date [" + source.getInBusinessSince() + "]",e);
			}
		}

		if(source.getDimension()!=null) {
		  target.setSeizeunitcode(source.getDimension().name());
		}
		if(source.getWeight()!=null) {
		  target.setWeightunitcode(source.getWeight().name());
		}
		target.setCurrencyFormatNational(source.isCurrencyFormatNational());
		target.setStorename(source.getName());
		target.setStorephone(source.getPhone());
		target.setStoreEmailAddress(source.getEmail());
		target.setUseCache(source.isUseCache());
		target.setRetailer(source.isRetailer());
		
		//get parent store
		if(!StringUtils.isBlank(source.getRetailerStore())) {
		  if(source.getRetailerStore().equals(source.getCode())) {
		    throw new ConversionException("Parent store [" + source.getRetailerStore() + "] cannot be parent of current store");
		  }
		  try {
            MerchantStore parent = merchantStoreService.getByCode(source.getRetailerStore());
            if(parent == null) {
              throw new ConversionException("Parent store [" + source.getRetailerStore() + "] does not exist");
            }
            target.setParent(parent);
          } catch (ServiceException e) {
              throw new ConversionException(e);
          }
		}
		
		
		try {
			
			if(!StringUtils.isEmpty(source.getDefaultLanguage())) {
				Language l = languageService.getByCode(source.getDefaultLanguage());
				target.setDefaultLanguage(l);
			}
			
			if(!StringUtils.isEmpty(source.getCurrency())) {
				Currency c = currencyService.getByCode(source.getCurrency());
				target.setCurrency(c);
			} else {
				target.setCurrency(currencyService.getByCode(Constants.DEFAULT_CURRENCY.getCurrencyCode()));
			}
			
			List<String> languages = source.getSupportedLanguages();
			if(!CollectionUtils.isEmpty(languages)) {
				for(String lang : languages) {
					Language ll = languageService.getByCode(lang);
					target.getLanguages().add(ll);
				}
			}
			
		} catch(Exception e) {
			throw new ConversionException(e);
		}
		
		//address population
		PersistableAddress address = source.getAddress();
		if(address != null) {
			Country country;
			try {
				country = countryService.getByCode(address.getCountry());

				Zone zone = zoneService.getByCode(address.getStateProvince());
				if(zone != null) {
					target.setZone(zone);
				} else {
					target.setStorestateprovince(address.getStateProvince());
				}
				
				target.setStoreaddress(address.getAddress());
				target.setStorecity(address.getCity());
				target.setCountry(country);
				target.setStorepostalcode(address.getPostalCode());
				
			} catch (ServiceException e) {
				throw new ConversionException(e);
			}
		}

		if (StringUtils.isNotEmpty(source.getTemplate()))
			target.setStoreTemplate(source.getTemplate());

		populateStorefront(source, target);
		
		return target;
	}

	private void populateStorefront(PersistableMerchantStore source, MerchantStore target) {
		PersistableStoreSeoConfig seoSource = source.getSeoConfig();
		if (seoSource != null) {
			StoreSeoConfig seoConfig = new StoreSeoConfig();
			seoConfig.setMetaTitle(seoSource.getMetaTitle());
			seoConfig.setMetaDescription(seoSource.getMetaDescription());
			seoConfig.setMetaKeywords(seoSource.getMetaKeywords());
			seoConfig.setOgTitle(seoSource.getOgTitle());
			seoConfig.setOgDescription(seoSource.getOgDescription());
			seoConfig.setOgImage(seoSource.getOgImage());
			seoConfig.setCanonicalUrl(seoSource.getCanonicalUrl());
			if (seoSource.getRobotsIndex() != null) {
				seoConfig.setRobotsIndex(seoSource.getRobotsIndex());
			}
			if (seoSource.getRobotsFollow() != null) {
				seoConfig.setRobotsFollow(seoSource.getRobotsFollow());
			}
			seoConfig.setStructuredData(seoSource.getStructuredData());
			target.setSeoConfig(seoConfig);
		}

		PersistableStoreDeliveryConfig deliverySource = source.getDeliveryConfig();
		if (deliverySource != null) {
			StoreDeliveryConfig deliveryConfig = new StoreDeliveryConfig();
			deliveryConfig.setDeliveryEnabled(deliverySource.isDeliveryEnabled());
			deliveryConfig.setDeliveryRadiusKm(deliverySource.getDeliveryRadiusKm());
			deliveryConfig.setMinimumOrderAmount(deliverySource.getMinimumOrderAmount());
			deliveryConfig.setDeliveryCharge(deliverySource.getDeliveryCharge());
			deliveryConfig.setFreeDeliveryAbove(deliverySource.getFreeDeliveryAbove());
			deliveryConfig.setEstimatedDeliveryMin(deliverySource.getEstimatedDeliveryMin());
			deliveryConfig.setEstimatedDeliveryMax(deliverySource.getEstimatedDeliveryMax());
			deliveryConfig.setSameDayDelivery(deliverySource.isSameDayDelivery());
			deliveryConfig.setExpressDelivery(deliverySource.isExpressDelivery());
			deliveryConfig.setPickupEnabled(deliverySource.isPickupEnabled());
			target.setDeliveryConfig(deliveryConfig);
		}

		PersistableStorePaymentConfig paymentSource = source.getPaymentConfig();
		if (paymentSource != null) {
			StorePaymentConfig paymentConfig = new StorePaymentConfig();
			paymentConfig.setCodEnabled(paymentSource.isCodEnabled());
			paymentConfig.setOnlinePaymentEnabled(paymentSource.isOnlinePaymentEnabled());
			paymentConfig.setUpiEnabled(paymentSource.isUpiEnabled());
			paymentConfig.setPaymentProvider(paymentSource.getPaymentProvider());
			paymentConfig.setConfiguration(paymentSource.getConfiguration());
			paymentConfig.setActive(paymentSource.isActive());
			target.setPaymentConfig(paymentConfig);
		}

		PersistableStoreThemeConfig themeSource = source.getThemeConfig();
		if (themeSource != null) {
			StoreThemeConfig themeConfig = new StoreThemeConfig();
			themeConfig.setThemeName(themeSource.getThemeName());
			themeConfig.setPrimaryColor(themeSource.getPrimaryColor());
			themeConfig.setSecondaryColor(themeSource.getSecondaryColor());
			themeConfig.setAccentColor(themeSource.getAccentColor());
			themeConfig.setBackgroundColor(themeSource.getBackgroundColor());
			themeConfig.setTextColor(themeSource.getTextColor());
			themeConfig.setFontFamily(themeSource.getFontFamily());
			themeConfig.setBorderRadius(themeSource.getBorderRadius());
			themeConfig.setButtonStyle(themeSource.getButtonStyle());
			themeConfig.setCardStyle(themeSource.getCardStyle());
			themeConfig.setHeaderStyle(themeSource.getHeaderStyle());
			themeConfig.setFooterStyle(themeSource.getFooterStyle());
			themeConfig.setCustomCss(themeSource.getCustomCss());
			target.setThemeConfig(themeConfig);
		}

		if (source.getBusinessHours() != null) {
			Set<StoreBusinessHours> businessHours = new HashSet<>();
			for (PersistableStoreBusinessHours hoursSource : source.getBusinessHours()) {
				StoreBusinessHours hours = new StoreBusinessHours();
				hours.setDayOfWeek(hoursSource.getDayOfWeek());
				hours.setOpeningTime(hoursSource.getOpeningTime());
				hours.setClosingTime(hoursSource.getClosingTime());
				hours.setClosed(hoursSource.isClosed());
				hours.setTwentyFourHours(hoursSource.isTwentyFourHours());
				hours.setMerchantStore(target);
				businessHours.add(hours);
			}
			target.setBusinessHours(businessHours);
		}

		if (source.getDeliveryZones() != null) {
			Set<StoreDeliveryZone> deliveryZones = new HashSet<>();
			for (PersistableStoreDeliveryZone zoneSource : source.getDeliveryZones()) {
				StoreDeliveryZone zone = new StoreDeliveryZone();
				zone.setZoneName(zoneSource.getZoneName());
				zone.setPostalCode(zoneSource.getPostalCode());
				zone.setDeliveryCharge(zoneSource.getDeliveryCharge());
				zone.setMinimumOrderAmount(zoneSource.getMinimumOrderAmount());
				zone.setFreeDeliveryAbove(zoneSource.getFreeDeliveryAbove());
				zone.setEstimatedDeliveryMin(zoneSource.getEstimatedDeliveryMin());
				zone.setEstimatedDeliveryMax(zoneSource.getEstimatedDeliveryMax());
				zone.setActive(zoneSource.isActive());
				zone.setMerchantStore(target);
				deliveryZones.add(zone);
			}
			target.setDeliveryZones(deliveryZones);
		}

		if (source.getHomepageSections() != null) {
			Set<StoreHomepageSection> homepageSections = new HashSet<>();
			for (PersistableStoreHomepageSection sectionSource : source.getHomepageSections()) {
				StoreHomepageSection section = new StoreHomepageSection();
				section.setSectionType(sectionSource.getSectionType());
				section.setTitle(sectionSource.getTitle());
				section.setSubtitle(sectionSource.getSubtitle());
				section.setImageUrl(sectionSource.getImageUrl());
				section.setConfiguration(sectionSource.getConfiguration());
				section.setDisplayOrder(sectionSource.getDisplayOrder());
				section.setActive(sectionSource.isActive());
				section.setMerchantStore(target);
				homepageSections.add(section);
			}
			target.setHomepageSections(homepageSections);
		}

		if (source.getNavigations() != null) {
			Set<StoreNavigation> navigations = new HashSet<>();
			for (PersistableStoreNavigation navigationSource : source.getNavigations()) {
				populateNavigation(navigationSource, target, null, navigations);
			}
			target.setNavigations(navigations);
		}

		if (source.getPages() != null) {
			Set<StorePage> pages = new HashSet<>();
			for (PersistableStorePage pageSource : source.getPages()) {
				StorePage page = new StorePage();
				page.setPageType(pageSource.getPageType());
				page.setSlug(pageSource.getSlug());
				page.setTitle(pageSource.getTitle());
				page.setDescription(pageSource.getDescription());
				page.setPublished(pageSource.isPublished());
				page.setMetaTitle(pageSource.getMetaTitle());
				page.setMetaDescription(pageSource.getMetaDescription());
				page.setVersion(pageSource.getVersion());
				page.setMerchantStore(target);

				if (pageSource.getSections() != null) {
					for (PersistableStorePageSection sectionSource : pageSource.getSections()) {
						StorePageSection section = new StorePageSection();
						section.setSectionType(sectionSource.getSectionType());
						section.setTitle(sectionSource.getTitle());
						section.setSubtitle(sectionSource.getSubtitle());
						section.setImageUrl(sectionSource.getImageUrl());
						section.setContent(sectionSource.getContent());
						section.setConfiguration(sectionSource.getConfiguration());
						section.setDisplayOrder(sectionSource.getDisplayOrder());
						section.setActive(sectionSource.isActive());
						page.addSection(section);
					}
				}
				pages.add(page);
			}
			target.setPages(pages);
		}

		if (source.getPolicies() != null) {
			Set<StorePolicy> policies = new HashSet<>();
			for (PersistableStorePolicy policySource : source.getPolicies()) {
				StorePolicy policy = new StorePolicy();
				policy.setPolicyType(policySource.getPolicyType());
				policy.setTitle(policySource.getTitle());
				policy.setContent(policySource.getContent());
				policy.setActive(policySource.isActive());
				policy.setMerchantStore(target);
				policies.add(policy);
			}
			target.setPolicies(policies);
		}

		if (source.getSocialLinks() != null) {
			Set<StoreSocialLink> socialLinks = new HashSet<>();
			for (PersistableStoreSocialLink linkSource : source.getSocialLinks()) {
				StoreSocialLink link = new StoreSocialLink();
				link.setPlatform(linkSource.getPlatform());
				link.setUrl(linkSource.getUrl());
				link.setDisplayOrder(linkSource.getDisplayOrder());
				link.setActive(linkSource.isActive());
				link.setMerchantStore(target);
				socialLinks.add(link);
			}
			target.setSocialLinks(socialLinks);
		}
	}

	private void populateNavigation(PersistableStoreNavigation source, MerchantStore store, StoreNavigation parent,
			Set<StoreNavigation> navigations) {
		StoreNavigation navigation = new StoreNavigation();
		navigation.setLabel(source.getLabel());
		navigation.setUrl(source.getUrl());
		navigation.setIcon(source.getIcon());
		navigation.setDisplayOrder(source.getDisplayOrder());
		navigation.setOpenNewTab(source.isOpenNewTab());
		navigation.setActive(source.isActive());
		navigation.setMerchantStore(store);
		navigation.setParent(parent);
		navigations.add(navigation);

		if (parent != null) {
			parent.getChildren().add(navigation);
		}
		if (source.getChildren() != null) {
			for (PersistableStoreNavigation childSource : source.getChildren()) {
				populateNavigation(childSource, store, navigation, navigations);
			}
		}
	}

	@Override
	protected MerchantStore createTarget() {
		// TODO Auto-generated method stub
		return null;
	}

	public ZoneService getZoneService() {
		return zoneService;
	}

	public void setZoneService(ZoneService zoneService) {
		this.zoneService = zoneService;
	}
	public CountryService getCountryService() {
		return countryService;
	}

	public void setCountryService(CountryService countryService) {
		this.countryService = countryService;
	}

	public LanguageService getLanguageService() {
		return languageService;
	}

	public void setLanguageService(LanguageService languageService) {
		this.languageService = languageService;
	}

	public CurrencyService getCurrencyService() {
		return currencyService;
	}

	public void setCurrencyService(CurrencyService currencyService) {
		this.currencyService = currencyService;
	}


}
