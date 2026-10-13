package com.salesmanager.core.model.storefront;

import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name = "STORE_SOCIAL_LINK", schema = "lylac_storefront")
public class StoreSocialLink extends StorefrontEntity {
    @javax.persistence.Column(name = "PLATFORM", length = 50)
    private String platform;
    @javax.persistence.Column(name = "URL", length = 500)
    private String url;
    @javax.persistence.Column(name = "DISPLAY_ORDER")
    private Integer displayOrder = 0;
    @javax.persistence.Column(name = "IS_ACTIVE")
    private Boolean active = true;

    public String getPlatform() {
        return platform;
    }

    public void setPlatform(String value) {
        platform = value;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String value) {
        url = value;
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
