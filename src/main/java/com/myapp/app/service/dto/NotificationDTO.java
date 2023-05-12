package com.myapp.app.service.dto;

import java.io.Serializable;
import java.util.Objects;
import java.util.UUID;

/**
 * A DTO for the {@link com.myapp.app.domain.Notification} entity.
 */
@SuppressWarnings("common-java:DuplicatedBlocks")
public class NotificationDTO implements Serializable {

    private UUID id;

    private UUID userId;

    private UUID orderId;

    private String message;

    private String type;

    private Boolean isRead;

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public UUID getUserId() {
        return userId;
    }

    public void setUserId(UUID userId) {
        this.userId = userId;
    }

    public UUID getOrderId() {
        return orderId;
    }

    public void setOrderId(UUID orderId) {
        this.orderId = orderId;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public Boolean getIsRead() {
        return isRead;
    }

    public void setIsRead(Boolean isRead) {
        this.isRead = isRead;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof NotificationDTO)) {
            return false;
        }

        NotificationDTO notificationDTO = (NotificationDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, notificationDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "NotificationDTO{" +
            "id='" + getId() + "'" +
            ", userId='" + getUserId() + "'" +
            ", orderId='" + getOrderId() + "'" +
            ", message='" + getMessage() + "'" +
            ", type='" + getType() + "'" +
            ", isRead='" + getIsRead() + "'" +
            "}";
    }
}
