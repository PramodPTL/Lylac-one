package com.salesmanager.core.model.storefront;

import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name = "STORE_SEO_CONFIG")
public class StoreSeoConfig extends StorefrontEntity {
    private String metaTitle, metaDescription, metaKeywords, ogTitle, ogDescription, ogImage, canonicalUrl,
            structuredData;
    private Boolean robotsIndex = true, robotsFollow = true;

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
