package com.salesmanager.shop.model.storefront.policy;

import java.io.Serializable;

public class PersistableStorePolicy implements Serializable {
    private static final long serialVersionUID = 1L;

    private String policyType;
    private String title;
    private String content;
    private boolean active = true;

    public String getPolicyType() {
        return policyType;
    }

    public void setPolicyType(String policyType) {
        this.policyType = policyType;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public boolean isActive() {
        return active;
    }

    public void setActive(boolean active) {
        this.active = active;
    }
}
