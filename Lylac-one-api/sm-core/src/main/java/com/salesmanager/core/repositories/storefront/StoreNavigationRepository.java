package com.salesmanager.core.repositories.storefront;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import com.salesmanager.core.model.storefront.StoreNavigation;

public interface StoreNavigationRepository extends JpaRepository<StoreNavigation, Long> {
	List<StoreNavigation> findByMerchantIdAndActiveTrueOrderByDisplayOrderAsc(Integer merchantId);
	List<StoreNavigation> findByMerchantIdOrderByDisplayOrderAsc(Integer merchantId);
}
