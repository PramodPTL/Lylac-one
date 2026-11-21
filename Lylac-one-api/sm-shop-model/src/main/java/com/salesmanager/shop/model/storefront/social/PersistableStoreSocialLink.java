package com.salesmanager.shop.model.storefront.social;

import java.io.Serializable;

public class PersistableStoreSocialLink implements Serializable {
    private static final long serialVersionUID = 1L;

    private String platform;
    private String url;
    private Integer displayOrder = 0;
    private boolean active = true;

    public String getPlatform() {
        return platform;
    }

    public void setPlatform(String platform) {
        this.platform = platform;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public Integer getDisplayOrder() {
        return displayOrder;
    }

    public void setDisplayOrder(Integer displayOrder) {
        this.displayOrder = displayOrder;
    }

    public boolean isActive() {
        return active;
    }

    public void setActive(boolean active) {
        this.active = active;
    }
}
