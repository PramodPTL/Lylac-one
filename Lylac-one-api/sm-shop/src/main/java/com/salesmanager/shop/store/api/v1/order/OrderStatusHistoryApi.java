package com.salesmanager.shop.store.api.v1.order;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import javax.inject.Inject;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import com.salesmanager.shop.constants.Constants;

import com.salesmanager.core.model.merchant.MerchantStore;
import com.salesmanager.core.model.reference.language.Language;
import com.salesmanager.shop.model.order.history.PersistableOrderStatusHistory;
import com.salesmanager.shop.model.order.history.ReadableOrderStatusHistory;
import com.salesmanager.shop.store.controller.order.facade.OrderFacade;
import com.salesmanager.shop.utils.AuthorizationUtils;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.SwaggerDefinition;
import io.swagger.annotations.Tag;
import springfox.documentation.annotations.ApiIgnore;

@RestController
@RequestMapping("/api/v1")
@Api(tags = { "Order status history api" })
@SwaggerDefinition(tags = {
		@Tag(name = "Order status history resource", description = "Related to OrderManagement api") })
/**
 * REST API controller for managing order status history.
 * <p>
 * This class provides endpoints to list and create order status history entries.
 * It is responsible for handling HTTP requests, performing authorization checks,
 * and delegating the business logic to the {@link OrderFacade}.
 */
public class OrderStatusHistoryApi {

	@Inject
	private OrderFacade orderFacade;

	@Inject
	private AuthorizationUtils authorizationUtils;

	/**
	 * Retrieves the status history for a specific order.
	 * 
	 * @param id The ID of the order.
	 * @param merchantStore The current merchant store context (injected).
	 * @param language The current language context (injected).
	 * @return A list of {@link ReadableOrderStatusHistory} representing the order's status history.
	 */
	@RequestMapping(value = { "private/orders/{id}/history" }, method = RequestMethod.GET)
	@ResponseStatus(HttpStatus.OK)
	@ResponseBody
	public List<ReadableOrderStatusHistory> list(@PathVariable final Long id, @ApiIgnore MerchantStore merchantStore,
			@ApiIgnore Language language) {

		String user = authorizationUtils.authenticatedUser();
		authorizationUtils.authorizeUser(user, Stream.of(Constants.GROUP_SUPERADMIN, Constants.GROUP_ADMIN,
				Constants.GROUP_ADMIN_ORDER, Constants.GROUP_ADMIN_RETAIL).collect(Collectors.toList()), merchantStore);

		return orderFacade.getReadableOrderHistory(id, merchantStore, language);

	}

	/**
	 * Creates a new order status history entry for a specific order.
	 * 
	 * @param id The ID of the order.
	 * @param history The new order status history details to be persisted.
	 * @param merchantStore The current merchant store context (injected).
	 * @param language The current language context (injected).
	 */
	@RequestMapping(value = { "private/orders/{id}/history" }, method = RequestMethod.POST)
	@ResponseStatus(HttpStatus.CREATED)
	@ApiOperation(httpMethod = "POST", value = "Add order history", notes = "Adds a new status to an order", produces = "application/json", response = Void.class)
	@ResponseBody
	public void create(@PathVariable final Long id, @RequestBody PersistableOrderStatusHistory history,
			@ApiIgnore MerchantStore merchantStore, @ApiIgnore Language language) {

		String user = authorizationUtils.authenticatedUser();
		authorizationUtils.authorizeUser(user, Stream.of(Constants.GROUP_SUPERADMIN, Constants.GROUP_ADMIN,
				Constants.GROUP_ADMIN_ORDER, Constants.GROUP_ADMIN_RETAIL).collect(Collectors.toList()), merchantStore);

		// TODO validate date format

		orderFacade.createOrderStatus(history, id, merchantStore);

	}

}
