package com.salesmanager.core.model.storefront;

import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name = "STORE_PAGE_SECTION")
public class StorePageSection extends StorefrontEntity {
    private Long pageId;
    private String sectionType, title, subtitle, imageUrl, content, configuration;
    private Integer displayOrder = 0;
    private Boolean active = true;

    public Long getPageId() {
        return pageId;
    }

    public void setPageId(Long value) {
        pageId = value;
    }

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

    public String getContent() {
        return content;
    }

    public void setContent(String value) {
        content = value;
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
