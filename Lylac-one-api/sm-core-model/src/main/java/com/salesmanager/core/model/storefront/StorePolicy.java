package com.salesmanager.core.model.storefront;

import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name = "STORE_POLICY", schema = "lylac_storefront")
public class StorePolicy extends StorefrontEntity {
    @javax.persistence.Column(name = "POLICY_TYPE", length = 50)
    private String policyType;
    @javax.persistence.Column(name = "TITLE", length = 255)
    private String title;
    @javax.persistence.Column(name = "CONTENT", columnDefinition = "text")
    private String content;
    @javax.persistence.Column(name = "IS_ACTIVE")
    private Boolean active = true;

    public String getPolicyType() {
        return policyType;
    }

    public void setPolicyType(String value) {
        policyType = value;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String value) {
        title = value;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String value) {
        content = value;
    }

    public Boolean getActive() {
        return active;
    }

    public void setActive(Boolean value) {
        active = value;
    }
}
