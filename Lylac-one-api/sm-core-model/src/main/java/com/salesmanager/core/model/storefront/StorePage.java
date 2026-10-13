package com.salesmanager.core.model.storefront;

import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name = "STORE_PAGE", schema = "lylac_storefront")
public class StorePage extends StorefrontEntity {
    @javax.persistence.Column(name = "PAGE_TYPE", length = 50)
    private String pageType;
    @javax.persistence.Column(name = "SLUG", length = 150)
    private String slug;
    @javax.persistence.Column(name = "TITLE", length = 255)
    private String title;
    @javax.persistence.Column(name = "DESCRIPTION", columnDefinition = "text")
    private String description;
    @javax.persistence.Column(name = "IS_PUBLISHED")
    private Boolean published = false;
    @javax.persistence.Column(name = "META_TITLE", length = 255)
    private String metaTitle;
    @javax.persistence.Column(name = "META_DESCRIPTION", length = 500)
    private String metaDescription;
    @javax.persistence.Column(name = "VERSION")
    private Long version = 0L;

    public String getPageType() {
        return pageType;
    }

    public void setPageType(String value) {
        pageType = value;
    }

    public String getSlug() {
        return slug;
    }

    public void setSlug(String value) {
        slug = value;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String value) {
        title = value;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String value) {
        description = value;
    }

    public Boolean getPublished() {
        return published;
    }

    public void setPublished(Boolean value) {
        published = value;
    }

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

    public Long getVersion() {
        return version;
    }

    public void setVersion(Long value) {
        version = value;
    }
}
