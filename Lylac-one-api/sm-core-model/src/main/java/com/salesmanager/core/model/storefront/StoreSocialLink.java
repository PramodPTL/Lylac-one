package com.salesmanager.core.model.storefront;

import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name = "STORE_SOCIAL_LINK")
public class StoreSocialLink extends StorefrontEntity {
    private String platform, url;
    private Integer displayOrder = 0;
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
