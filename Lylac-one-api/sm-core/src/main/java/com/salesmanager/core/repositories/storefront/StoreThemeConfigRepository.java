package com.salesmanager.core.repositories.storefront;

import org.springframework.data.jpa.repository.JpaRepository;
import com.salesmanager.core.model.storefront.StoreThemeConfig;

public interface StoreThemeConfigRepository extends JpaRepository<StoreThemeConfig, Long> {
	StoreThemeConfig findByMerchantId(Integer merchantId);
}
