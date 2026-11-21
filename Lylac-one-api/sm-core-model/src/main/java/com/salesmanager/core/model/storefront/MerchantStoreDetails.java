package com.salesmanager.core.model.storefront;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;

public class MerchantStoreDetails implements Serializable {

    private static final long serialVersionUID = 1L;

    private Integer merchantId;
    private Date dateCreated;
    private Date dateModified;
    private String updtId;
    private String storeCode;
    private String continueshoppingurl;
    private Boolean currencyFormatNational;
    private String domainName;
    private Date inBusinessSince;
    private String invoiceTemplate;
    private String lineage;
    private Boolean isRetailer;
    private String seizeunitcode;
    private String storeEmail;
    private String storeLogo;
    private String storeTemplate;
    private String storeAddress;
    private String storeCity;
    private String storeName;
    private String storePhone;
    private String storePostalCode;
    private String storeStateProv;
    private Boolean useCache;
    private String weightunitcode;
    private Integer countryId;
    private Long currencyId;
    private Integer languageId;
    private Integer parentId;
    private Long zoneId;
    private String storeSlug;
    private String storeDescription;
    private String storeShortDescription;
    private String coverImageUrl;
    private String faviconUrl;
    private String status;
    private Boolean isVerified;
    private Boolean isFeatured;
    private Boolean acceptingOrders;
    private BigDecimal latitude;
    private BigDecimal longitude;
    private String googlePlaceId;
    private String supportEmail;
    private String whatsappNumber;
    private String pharmacyLicenseNumber;
    private String gstNumber;
    private String drugLicenseNumber;
    private Date licenseExpiryDate;
    private Long version;
    private Long createdBy;
    private Long modifiedBy;
    private Date deletedAt;

    public Integer getMerchantId() {
        return merchantId;
    }

    public void setMerchantId(Integer merchantId) {
        this.merchantId = merchantId;
    }

    public Date getDateCreated() {
        return dateCreated;
    }

    public void setDateCreated(Date dateCreated) {
        this.dateCreated = dateCreated;
    }

    public Date getDateModified() {
        return dateModified;
    }

    public void setDateModified(Date dateModified) {
        this.dateModified = dateModified;
    }

    public String getUpdtId() {
        return updtId;
    }

    public void setUpdtId(String updtId) {
        this.updtId = updtId;
    }

    public String getStoreCode() {
        return storeCode;
    }

    public void setStoreCode(String storeCode) {
        this.storeCode = storeCode;
    }

    public String getContinueshoppingurl() {
        return continueshoppingurl;
    }

    public void setContinueshoppingurl(String continueshoppingurl) {
        this.continueshoppingurl = continueshoppingurl;
    }

    public Boolean getCurrencyFormatNational() {
        return currencyFormatNational;
    }

    public void setCurrencyFormatNational(Boolean currencyFormatNational) {
        this.currencyFormatNational = currencyFormatNational;
    }

    public String getDomainName() {
        return domainName;
    }

    public void setDomainName(String domainName) {
        this.domainName = domainName;
    }

    public Date getInBusinessSince() {
        return inBusinessSince;
    }

    public void setInBusinessSince(Date inBusinessSince) {
        this.inBusinessSince = inBusinessSince;
    }

    public String getInvoiceTemplate() {
        return invoiceTemplate;
    }

    public void setInvoiceTemplate(String invoiceTemplate) {
        this.invoiceTemplate = invoiceTemplate;
    }

    public String getLineage() {
        return lineage;
    }

    public void setLineage(String lineage) {
        this.lineage = lineage;
    }

    public Boolean getIsRetailer() {
        return isRetailer;
    }

    public void setIsRetailer(Boolean isRetailer) {
        this.isRetailer = isRetailer;
    }

    public String getSeizeunitcode() {
        return seizeunitcode;
    }

    public void setSeizeunitcode(String seizeunitcode) {
        this.seizeunitcode = seizeunitcode;
    }

    public String getStoreEmail() {
        return storeEmail;
    }

    public void setStoreEmail(String storeEmail) {
        this.storeEmail = storeEmail;
    }

    public String getStoreLogo() {
        return storeLogo;
    }

    public void setStoreLogo(String storeLogo) {
        this.storeLogo = storeLogo;
    }

    public String getStoreTemplate() {
        return storeTemplate;
    }

    public void setStoreTemplate(String storeTemplate) {
        this.storeTemplate = storeTemplate;
    }

    public String getStoreAddress() {
        return storeAddress;
    }

    public void setStoreAddress(String storeAddress) {
        this.storeAddress = storeAddress;
    }

    public String getStoreCity() {
        return storeCity;
    }

    public void setStoreCity(String storeCity) {
        this.storeCity = storeCity;
    }

    public String getStoreName() {
        return storeName;
    }

    public void setStoreName(String storeName) {
        this.storeName = storeName;
    }

    public String getStorePhone() {
        return storePhone;
    }

    public void setStorePhone(String storePhone) {
        this.storePhone = storePhone;
    }

    public String getStorePostalCode() {
        return storePostalCode;
    }

    public void setStorePostalCode(String storePostalCode) {
        this.storePostalCode = storePostalCode;
    }

    public String getStoreStateProv() {
        return storeStateProv;
    }

    public void setStoreStateProv(String storeStateProv) {
        this.storeStateProv = storeStateProv;
    }

    public Boolean getUseCache() {
        return useCache;
    }

    public void setUseCache(Boolean useCache) {
        this.useCache = useCache;
    }

    public String getWeightunitcode() {
        return weightunitcode;
    }

    public void setWeightunitcode(String weightunitcode) {
        this.weightunitcode = weightunitcode;
    }

    public Integer getCountryId() {
        return countryId;
    }

    public void setCountryId(Integer countryId) {
        this.countryId = countryId;
    }

    public Long getCurrencyId() {
        return currencyId;
    }

    public void setCurrencyId(Long currencyId) {
        this.currencyId = currencyId;
    }

    public Integer getLanguageId() {
        return languageId;
    }

    public void setLanguageId(Integer languageId) {
        this.languageId = languageId;
    }

    public Integer getParentId() {
        return parentId;
    }

    public void setParentId(Integer parentId) {
        this.parentId = parentId;
    }

    public Long getZoneId() {
        return zoneId;
    }

    public void setZoneId(Long zoneId) {
        this.zoneId = zoneId;
    }

    public String getStoreSlug() {
        return storeSlug;
    }

    public void setStoreSlug(String storeSlug) {
        this.storeSlug = storeSlug;
    }

    public String getStoreDescription() {
        return storeDescription;
    }

    public void setStoreDescription(String storeDescription) {
        this.storeDescription = storeDescription;
    }

    public String getStoreShortDescription() {
        return storeShortDescription;
    }

    public void setStoreShortDescription(String storeShortDescription) {
        this.storeShortDescription = storeShortDescription;
    }

    public String getCoverImageUrl() {
        return coverImageUrl;
    }

    public void setCoverImageUrl(String coverImageUrl) {
        this.coverImageUrl = coverImageUrl;
    }

    public String getFaviconUrl() {
        return faviconUrl;
    }

    public void setFaviconUrl(String faviconUrl) {
        this.faviconUrl = faviconUrl;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Boolean getIsVerified() {
        return isVerified;
    }

    public void setIsVerified(Boolean isVerified) {
        this.isVerified = isVerified;
    }

    public Boolean getIsFeatured() {
        return isFeatured;
    }

    public void setIsFeatured(Boolean isFeatured) {
        this.isFeatured = isFeatured;
    }

    public Boolean getAcceptingOrders() {
        return acceptingOrders;
    }

    public void setAcceptingOrders(Boolean acceptingOrders) {
        this.acceptingOrders = acceptingOrders;
    }

    public BigDecimal getLatitude() {
        return latitude;
    }

    public void setLatitude(BigDecimal latitude) {
        this.latitude = latitude;
    }

    public BigDecimal getLongitude() {
        return longitude;
    }

    public void setLongitude(BigDecimal longitude) {
        this.longitude = longitude;
    }

    public String getGooglePlaceId() {
        return googlePlaceId;
    }

    public void setGooglePlaceId(String googlePlaceId) {
        this.googlePlaceId = googlePlaceId;
    }

    public String getSupportEmail() {
        return supportEmail;
    }

    public void setSupportEmail(String supportEmail) {
        this.supportEmail = supportEmail;
    }

    public String getWhatsappNumber() {
        return whatsappNumber;
    }

    public void setWhatsappNumber(String whatsappNumber) {
        this.whatsappNumber = whatsappNumber;
    }

    public String getPharmacyLicenseNumber() {
        return pharmacyLicenseNumber;
    }

    public void setPharmacyLicenseNumber(String pharmacyLicenseNumber) {
        this.pharmacyLicenseNumber = pharmacyLicenseNumber;
    }

    public String getGstNumber() {
        return gstNumber;
    }

    public void setGstNumber(String gstNumber) {
        this.gstNumber = gstNumber;
    }

    public String getDrugLicenseNumber() {
        return drugLicenseNumber;
    }

    public void setDrugLicenseNumber(String drugLicenseNumber) {
        this.drugLicenseNumber = drugLicenseNumber;
    }

    public Date getLicenseExpiryDate() {
        return licenseExpiryDate;
    }

    public void setLicenseExpiryDate(Date licenseExpiryDate) {
        this.licenseExpiryDate = licenseExpiryDate;
    }

    public Long getVersion() {
        return version;
    }

    public void setVersion(Long version) {
        this.version = version;
    }

    public Long getCreatedBy() {
        return createdBy;
    }

    public void setCreatedBy(Long createdBy) {
        this.createdBy = createdBy;
    }

    public Long getModifiedBy() {
        return modifiedBy;
    }

    public void setModifiedBy(Long modifiedBy) {
        this.modifiedBy = modifiedBy;
    }

    public Date getDeletedAt() {
        return deletedAt;
    }

    public void setDeletedAt(Date deletedAt) {
        this.deletedAt = deletedAt;
    }
}
