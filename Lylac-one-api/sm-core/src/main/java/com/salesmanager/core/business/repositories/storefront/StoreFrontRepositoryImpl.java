package com.salesmanager.core.business.repositories.storefront;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;

import org.springframework.transaction.annotation.Transactional;

import com.salesmanager.core.model.common.audit.AuditSection;
import com.salesmanager.core.model.merchant.MerchantStore;
import com.salesmanager.core.model.storefront.MerchantStoreDetails;
import com.salesmanager.core.model.storefront.StoreBusinessHours;
import com.salesmanager.core.model.storefront.StoreDeliveryConfig;
import com.salesmanager.core.model.storefront.StoreDeliveryZone;
import com.salesmanager.core.model.storefront.StoreFrontResponse;
import com.salesmanager.core.model.storefront.StoreHomepageSection;
import com.salesmanager.core.model.storefront.StoreNavigation;
import com.salesmanager.core.model.storefront.StorePage;
import com.salesmanager.core.model.storefront.StorePageSection;
import com.salesmanager.core.model.storefront.StorePaymentConfig;
import com.salesmanager.core.model.storefront.StorePolicy;
import com.salesmanager.core.model.storefront.StoreSeoConfig;
import com.salesmanager.core.model.storefront.StoreSocialLink;
import com.salesmanager.core.model.storefront.StoreThemeConfig;
import com.salesmanager.core.model.storefront.StorefrontEntity;

public class StoreFrontRepositoryImpl implements StoreFrontRepositoryCustom {

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    @Transactional(readOnly = true)
    public StoreFrontResponse getStoreFrontByMerchantId(int merchantId) {
        MerchantStore merchantStore = entityManager.find(MerchantStore.class, merchantId);
        if (merchantStore == null) {
            return null;
        }

        return buildStoreFrontResponse(merchantStore);
    }

    @Override
    @Transactional(readOnly = true)
    public StoreFrontResponse getStoreFrontByStoreCode(String storeCode) {
        List<MerchantStore> stores = entityManager.createQuery(
                "select store from MerchantStore store where store.code = :storeCode",
                MerchantStore.class)
                .setParameter("storeCode", storeCode)
                .setMaxResults(1)
                .getResultList();
        if (stores.isEmpty()) {
            return null;
        }

        return buildStoreFrontResponse(stores.get(0));
    }

    private StoreFrontResponse buildStoreFrontResponse(MerchantStore merchantStore) {
        int merchantId = merchantStore.getId();
        StoreFrontResponse response = new StoreFrontResponse();
        response.setMerchantId((long) merchantId);
        response.setMerchantStore(toMerchantStoreDetails(merchantStore));
        response.setStoreThemeConfig(findLatest(StoreThemeConfig.class, merchantId));
        response.setStoreSeoConfig(findLatest(StoreSeoConfig.class, merchantId));
        response.setStoreDeliveryConfig(findLatest(StoreDeliveryConfig.class, merchantId));
        response.setStoreDeliveryZones(findAll(StoreDeliveryZone.class, merchantId));
        response.setStorePaymentConfig(findLatest(StorePaymentConfig.class, merchantId));
        response.setStoreNavigation(findAll(StoreNavigation.class, merchantId));
        response.setHomepageSections(findAll(StoreHomepageSection.class, merchantId));
        response.setPages(findAll(StorePage.class, merchantId));
        response.setPageSections(findPageSectionsForMerchant(merchantId));
        response.setSocialLinks(findAll(StoreSocialLink.class, merchantId));
        response.setPolicies(findAll(StorePolicy.class, merchantId));
        response.setBusinessHours(findAll(StoreBusinessHours.class, merchantId));
        return response;
    }

    private List<StorePageSection> findPageSectionsForMerchant(int merchantId) {
        TypedQuery<StorePageSection> query = entityManager.createQuery(
                "select section from StorePageSection section "
                        + "where section.pageId in "
                        + "(select page.id from StorePage page where page.merchantId = :merchantId) "
                        + "order by section.pageId, section.displayOrder, section.id",
                StorePageSection.class);
        query.setParameter("merchantId", merchantId);
        return query.getResultList();
    }

    private <T extends StorefrontEntity> T findLatest(Class<T> entityType, int merchantId) {
        return entityManager.createQuery(
                "select entity from " + entityType.getSimpleName()
                        + " entity where entity.merchantId = :merchantId"
                        + " order by entity.dateModified desc, entity.id desc",
                entityType)
                .setParameter("merchantId", merchantId)
                .setMaxResults(1)
                .getResultList()
                .stream()
                .findFirst()
                .orElse(null);
    }

    private <T extends StorefrontEntity> List<T> findAll(Class<T> entityType, int merchantId) {
        TypedQuery<T> query = entityManager.createQuery(
                "select entity from " + entityType.getSimpleName()
                        + " entity where entity.merchantId = :merchantId order by entity.id",
                entityType);
        query.setParameter("merchantId", merchantId);
        return query.getResultList();
    }

    private MerchantStoreDetails toMerchantStoreDetails(MerchantStore store) {
        MerchantStoreDetails details = new MerchantStoreDetails();
        details.setMerchantId(store.getId());

        AuditSection audit = store.getAuditSection();
        if (audit != null) {
            details.setDateCreated(audit.getDateCreated());
            details.setDateModified(audit.getDateModified());
            details.setUpdtId(audit.getModifiedBy());
        }

        details.setStoreCode(store.getCode());
        details.setContinueshoppingurl(store.getContinueshoppingurl());
        details.setCurrencyFormatNational(store.isCurrencyFormatNational());
        details.setDomainName(store.getDomainName());
        details.setInBusinessSince(store.getInBusinessSince());
        details.setInvoiceTemplate(store.getInvoiceTemplate());
        details.setLineage(store.getLineage());
        details.setIsRetailer(store.isRetailer());
        details.setSeizeunitcode(store.getSeizeunitcode());
        details.setStoreEmail(store.getStoreEmailAddress());
        details.setStoreLogo(store.getStoreLogo());
        details.setStoreTemplate(store.getStoreTemplate());
        details.setStoreAddress(store.getStoreaddress());
        details.setStoreCity(store.getStorecity());
        details.setStoreName(store.getStorename());
        details.setStorePhone(store.getStorephone());
        details.setStorePostalCode(store.getStorepostalcode());
        details.setStoreStateProv(store.getStorestateprovince());
        details.setUseCache(store.isUseCache());
        details.setWeightunitcode(store.getWeightunitcode());
        details.setCountryId(store.getCountry() == null ? null : store.getCountry().getId());
        details.setCurrencyId(store.getCurrency() == null ? null : store.getCurrency().getId());
        details.setLanguageId(
                store.getDefaultLanguage() == null ? null : store.getDefaultLanguage().getId());
        details.setParentId(store.getParent() == null ? null : store.getParent().getId());
        details.setZoneId(store.getZone() == null ? null : store.getZone().getId());
        details.setStoreSlug(store.getStoreSlug());
        details.setStoreDescription(store.getStoreDescription());
        details.setStoreShortDescription(store.getStoreShortDescription());
        details.setCoverImageUrl(store.getCoverImageUrl());
        details.setFaviconUrl(store.getFaviconUrl());
        details.setStatus(store.getStatus());
        details.setIsVerified(store.getVerified());
        details.setIsFeatured(store.getFeatured());
        details.setAcceptingOrders(store.getAcceptingOrders());
        details.setLatitude(store.getLatitude());
        details.setLongitude(store.getLongitude());
        details.setGooglePlaceId(store.getGooglePlaceId());
        details.setSupportEmail(store.getSupportEmail());
        details.setWhatsappNumber(store.getWhatsappNumber());
        details.setPharmacyLicenseNumber(store.getPharmacyLicenseNumber());
        details.setGstNumber(store.getGstNumber());
        details.setDrugLicenseNumber(store.getDrugLicenseNumber());
        details.setLicenseExpiryDate(store.getLicenseExpiryDate());
        details.setVersion(store.getVersion());
        details.setCreatedBy(store.getCreatedBy());
        details.setModifiedBy(store.getModifiedBy());
        details.setDeletedAt(store.getDeletedAt());
        return details;
    }
}
