package com.salesmanager.core.repositories.storefront;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import com.salesmanager.core.model.storefront.StoreDeliveryZone;

public interface StoreDeliveryZoneRepository extends JpaRepository<StoreDeliveryZone, Long> {
	List<StoreDeliveryZone> findByMerchantIdOrderByIdAsc(Integer merchantId);
}
