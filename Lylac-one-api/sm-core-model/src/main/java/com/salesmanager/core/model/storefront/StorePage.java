package com.salesmanager.core.model.storefront;

import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name = "STORE_PAGE")
public class StorePage extends StorefrontEntity {
    private String pageType, slug, title, description, metaTitle, metaDescription;
    private Boolean published = false;
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
