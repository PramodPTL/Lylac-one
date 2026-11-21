package com.salesmanager.shop.model.storefront.navigation;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

public class PersistableStoreNavigation implements Serializable {
    private static final long serialVersionUID = 1L;

    private String label;
    private String url;
    private String icon;
    private Integer displayOrder = 0;
    private boolean openNewTab;
    private boolean active = true;
    private List<PersistableStoreNavigation> children = new ArrayList<>();

    public String getLabel() {
        return label;
    }

    public void setLabel(String label) {
        this.label = label;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getIcon() {
        return icon;
    }

    public void setIcon(String icon) {
        this.icon = icon;
    }

    public Integer getDisplayOrder() {
        return displayOrder;
    }

    public void setDisplayOrder(Integer displayOrder) {
        this.displayOrder = displayOrder;
    }

    public boolean isOpenNewTab() {
        return openNewTab;
    }

    public void setOpenNewTab(boolean openNewTab) {
        this.openNewTab = openNewTab;
    }

    public boolean isActive() {
        return active;
    }

    public void setActive(boolean active) {
        this.active = active;
    }

    public List<PersistableStoreNavigation> getChildren() {
        return children;
    }

    public void setChildren(List<PersistableStoreNavigation> children) {
        this.children = children;
    }
}
