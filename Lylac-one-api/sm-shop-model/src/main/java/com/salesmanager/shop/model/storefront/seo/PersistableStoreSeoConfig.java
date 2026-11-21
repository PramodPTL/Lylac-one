package com.salesmanager.shop.model.storefront.seo;

import java.io.Serializable;

public class PersistableStoreSeoConfig implements Serializable {

    private static final long serialVersionUID = 1L;

    private String metaTitle;
    private String metaDescription;
    private String metaKeywords;

    private String ogTitle;
    private String ogDescription;
    private String ogImage;

    private String canonicalUrl;

    private Boolean robotsIndex;
    private Boolean robotsFollow;

    private String structuredData;

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

    public Boolean getRobotsIndex() {
        return robotsIndex;
    }

    public void setRobotsIndex(Boolean robotsIndex) {
        this.robotsIndex = robotsIndex;
    }

    public Boolean getRobotsFollow() {
        return robotsFollow;
    }

    public void setRobotsFollow(Boolean robotsFollow) {
        this.robotsFollow = robotsFollow;
    }

    public String getStructuredData() {
        return structuredData;
    }

    public void setStructuredData(String structuredData) {
        this.structuredData = structuredData;
    }
}
