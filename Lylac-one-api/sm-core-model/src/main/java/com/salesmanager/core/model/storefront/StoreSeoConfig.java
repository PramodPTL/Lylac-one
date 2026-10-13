package com.salesmanager.core.model.storefront;

import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name = "STORE_SEO_CONFIG", schema = "lylac_storefront")
public class StoreSeoConfig extends StorefrontEntity {
    @javax.persistence.Column(name = "META_TITLE", length = 255)
    private String metaTitle;
    @javax.persistence.Column(name = "META_DESCRIPTION", length = 500)
    private String metaDescription;
    @javax.persistence.Column(name = "META_KEYWORDS", columnDefinition = "text")
    private String metaKeywords;
    @javax.persistence.Column(name = "OG_TITLE", length = 255)
    private String ogTitle;
    @javax.persistence.Column(name = "OG_DESCRIPTION", length = 500)
    private String ogDescription;
    @javax.persistence.Column(name = "OG_IMAGE", length = 500)
    private String ogImage;
    @javax.persistence.Column(name = "CANONICAL_URL", length = 500)
    private String canonicalUrl;
    @javax.persistence.Column(name = "ROBOTS_INDEX")
    private Boolean robotsIndex = true;
    @javax.persistence.Column(name = "ROBOTS_FOLLOW")
    private Boolean robotsFollow = true;
    @javax.persistence.Column(name = "STRUCTURED_DATA", columnDefinition = "jsonb")
    private String structuredData;

    public String getMetaTitle() {
        return metaTitle;
    }

    public void setMetaTitle(String value) {
        metaTitle = value;
    }

    public String getMetaDescription() {
        return metaDescription;
    }

    public void setMetaDescription(String value) {
        metaDescription = value;
    }

    public String getMetaKeywords() {
        return metaKeywords;
    }

    public void setMetaKeywords(String value) {
        metaKeywords = value;
    }

    public String getOgTitle() {
        return ogTitle;
    }

    public void setOgTitle(String value) {
        ogTitle = value;
    }

    public String getOgDescription() {
        return ogDescription;
    }

    public void setOgDescription(String value) {
        ogDescription = value;
    }

    public String getOgImage() {
        return ogImage;
    }

    public void setOgImage(String value) {
        ogImage = value;
    }

    public String getCanonicalUrl() {
        return canonicalUrl;
    }

    public void setCanonicalUrl(String value) {
        canonicalUrl = value;
    }

    public Boolean getRobotsIndex() {
        return robotsIndex;
    }

    public void setRobotsIndex(Boolean value) {
        robotsIndex = value;
    }

    public Boolean getRobotsFollow() {
        return robotsFollow;
    }

    public void setRobotsFollow(Boolean value) {
        robotsFollow = value;
    }

    public String getStructuredData() {
        return structuredData;
    }

    public void setStructuredData(String value) {
        structuredData = value;
    }
}
