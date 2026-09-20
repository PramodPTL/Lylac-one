package com.salesmanager.core.model.storefront;

import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name = "STORE_NAVIGATION")
public class StoreNavigation extends StorefrontEntity {
    private Long parentId;
    private String label, url, icon;
    private Integer displayOrder = 0;
    private Boolean openNewTab = false, active = true;

    public Long getParentId() {
        return parentId;
    }

    public void setParentId(Long value) {
        parentId = value;
    }

    public String getLabel() {
        return label;
    }

    public void setLabel(String value) {
        label = value;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String value) {
        url = value;
    }

    public String getIcon() {
        return icon;
    }

    public void setIcon(String value) {
        icon = value;
    }

    public Integer getDisplayOrder() {
        return displayOrder;
    }

    public void setDisplayOrder(Integer value) {
        displayOrder = value;
    }

    public Boolean getOpenNewTab() {
        return openNewTab;
    }

    public void setOpenNewTab(Boolean value) {
        openNewTab = value;
    }

    public Boolean getActive() {
        return active;
    }

    public void setActive(Boolean value) {
        active = value;
    }
}
