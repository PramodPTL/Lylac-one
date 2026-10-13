package com.salesmanager.core.model.storefront;

import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name = "STORE_HOMEPAGE_SECTION", schema = "lylac_storefront")
public class StoreHomepageSection extends StorefrontEntity {
    @javax.persistence.Column(name = "SECTION_TYPE", length = 50)
    private String sectionType;
    @javax.persistence.Column(name = "TITLE", length = 255)
    private String title;
    @javax.persistence.Column(name = "SUBTITLE", length = 500)
    private String subtitle;
    @javax.persistence.Column(name = "IMAGE_URL", length = 500)
    private String imageUrl;
    @javax.persistence.Column(name = "CONFIGURATION", columnDefinition = "jsonb")
    private String configuration;
    @javax.persistence.Column(name = "DISPLAY_ORDER")
    private Integer displayOrder = 0;
    @javax.persistence.Column(name = "IS_ACTIVE")
    private Boolean active = true;

    public String getSectionType() {
        return sectionType;
    }

    public void setSectionType(String value) {
        sectionType = value;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String value) {
        title = value;
    }

    public String getSubtitle() {
        return subtitle;
    }

    public void setSubtitle(String value) {
        subtitle = value;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String value) {
        imageUrl = value;
    }

    public String getConfiguration() {
        return configuration;
    }

    public void setConfiguration(String value) {
        configuration = value;
    }

    public Integer getDisplayOrder() {
        return displayOrder;
    }

    public void setDisplayOrder(Integer value) {
        displayOrder = value;
    }

    public Boolean getActive() {
        return active;
    }

    public void setActive(Boolean value) {
        active = value;
    }
}
