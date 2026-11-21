package com.salesmanager.shop.model.storefront.page;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

public class PersistableStorePage implements Serializable {
    private static final long serialVersionUID = 1L;

    private String pageType;
    private String slug;
    private String title;
    private String description;
    private boolean published;
    private String metaTitle;
    private String metaDescription;
    private Long version = 0L;
    private List<PersistableStorePageSection> sections = new ArrayList<>();

    public String getPageType() {
        return pageType;
    }

    public void setPageType(String pageType) {
        this.pageType = pageType;
    }

    public String getSlug() {
        return slug;
    }

    public void setSlug(String slug) {
        this.slug = slug;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public boolean isPublished() {
        return published;
    }

    public void setPublished(boolean published) {
        this.published = published;
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

    public Long getVersion() {
        return version;
    }

    public void setVersion(Long version) {
        this.version = version;
    }

    public List<PersistableStorePageSection> getSections() {
        return sections;
    }

    public void setSections(List<PersistableStorePageSection> sections) {
        this.sections = sections;
    }
}
