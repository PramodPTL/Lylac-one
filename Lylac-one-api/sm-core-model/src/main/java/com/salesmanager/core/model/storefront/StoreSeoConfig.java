package com.salesmanager.core.model.storefront;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Index;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.salesmanager.core.model.merchant.MerchantStore;

import com.vladmihalcea.hibernate.type.json.JsonBinaryType;
import org.hibernate.annotations.Type;
import org.hibernate.annotations.TypeDef;

@Entity
@Table(
        name = "STORE_SEO_CONFIG",
        schema = "lylac_storefront",
        indexes = {
                @Index(
                        name = "IDX_SEO_CONFIG_STORE",
                        columnList = "MERCHANT_ID"
                )
        }
)
@TypeDef(name = "jsonb", typeClass = JsonBinaryType.class)
public class StoreSeoConfig extends StorefrontEntity {

    @OneToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(
            name = "MERCHANT_ID",
            nullable = false,
            unique = true
    )
    private MerchantStore merchantStore;

    @Column(name = "META_TITLE", length = 255)
    private String metaTitle;

    @Column(name = "META_DESCRIPTION", length = 500)
    private String metaDescription;

    @Column(name = "META_KEYWORDS", columnDefinition = "text")
    private String metaKeywords;

    @Column(name = "OG_TITLE", length = 255)
    private String ogTitle;

    @Column(name = "OG_DESCRIPTION", length = 500)
    private String ogDescription;

    @Column(name = "OG_IMAGE", length = 500)
    private String ogImage;

    @Column(name = "CANONICAL_URL", length = 500)
    private String canonicalUrl;

    @Column(name = "ROBOTS_INDEX", nullable = false)
    private boolean robotsIndex = true;

    @Column(name = "ROBOTS_FOLLOW", nullable = false)
    private boolean robotsFollow = true;

    @Type(type = "jsonb")
    @Column(name = "STRUCTURED_DATA", columnDefinition = "jsonb")
    private String structuredData;

    public MerchantStore getMerchantStore() {
        return merchantStore;
    }

    public void setMerchantStore(MerchantStore merchantStore) {
        this.merchantStore = merchantStore;
    }

    public String getMetaTitle() {
        return metaTitle;
    }

    public void setMetaTitle(String metaTitle) {
        this.metaTitle = metaTitle;
    }

    public String getMetaDescription() {
        return metaDescription;
    }

    public void setMetaDescription(String metaDescription) {
        this.metaDescription = metaDescription;
    }

    public String getMetaKeywords() {
        return metaKeywords;
    }

    public void setMetaKeywords(String metaKeywords) {
        this.metaKeywords = metaKeywords;
    }

    public String getOgTitle() {
        return ogTitle;
    }

    public void setOgTitle(String ogTitle) {
        this.ogTitle = ogTitle;
    }

    public String getOgDescription() {
        return ogDescription;
    }

    public void setOgDescription(String ogDescription) {
        this.ogDescription = ogDescription;
    }

    public String getOgImage() {
        return ogImage;
    }

    public void setOgImage(String ogImage) {
        this.ogImage = ogImage;
    }

    public String getCanonicalUrl() {
        return canonicalUrl;
    }

    public void setCanonicalUrl(String canonicalUrl) {
        this.canonicalUrl = canonicalUrl;
    }

    public boolean isRobotsIndex() {
        return robotsIndex;
    }

    public void setRobotsIndex(boolean robotsIndex) {
        this.robotsIndex = robotsIndex;
    }

    public boolean isRobotsFollow() {
        return robotsFollow;
    }

    public void setRobotsFollow(boolean robotsFollow) {
        this.robotsFollow = robotsFollow;
    }

    public String getStructuredData() {
        return structuredData;
    }

    public void setStructuredData(String structuredData) {
        this.structuredData = structuredData;
    }
}