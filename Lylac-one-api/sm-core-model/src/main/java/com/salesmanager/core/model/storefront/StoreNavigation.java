package com.salesmanager.core.model.storefront;

import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name = "STORE_NAVIGATION", schema = "lylac_storefront")
public class StoreNavigation extends StorefrontEntity {
    @javax.persistence.Column(name = "PARENT_ID")
    private Long parentId;
    @javax.persistence.Column(name = "LABEL", length = 100)
    private String label;
    @javax.persistence.Column(name = "URL", length = 500)
    private String url;
    @javax.persistence.Column(name = "ICON", length = 100)
    private String icon;
    @javax.persistence.Column(name = "DISPLAY_ORDER")
    private Integer displayOrder = 0;
    @javax.persistence.Column(name = "OPEN_NEW_TAB")
    private Boolean openNewTab = false;
    @javax.persistence.Column(name = "IS_ACTIVE")
    private Boolean active = true;

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
